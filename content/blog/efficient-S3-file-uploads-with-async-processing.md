---
author: kuba-s
tags:
  - S3, 
  - AWS
  - Lambda
  - Architecture
date: 2025-05-20T20:00:00.000Z
meaningfullyUpdatedAt: 2025-05-20T20:00:00.000Z
title: "Efficient S3 File Upload Pipeline with Presigned URLs, Event Triggers, and Lambda Processing"
layout: post
image: /images/efficient-S3-file-uploads-with-async-processing.png
hidden: false
comments: true
published: true
language: en
---

**Uploading files to S3 via pre-signed POST URLs allows clients to upload securely and efficiently without routing large payloads through your backend. You can enforce upload rules like file size and required metadata using S3 form conditions. A Lambda trigger processes the file after upload — extracting metadata and saving records to a database. This approach offloads heavy lifting to AWS, improves scalability, and keeps your architecture clean — but requires handling async workflow.**

## The Problem

Storing files in S3 is a common requirement for web and mobile applications — whether you're dealing with profile pictures, documents, videos, or logs. But designing the upload flow isn't just about sending bytes to a bucket. How files get uploaded and how you process them afterward can have a huge impact on system performance, cost, reliability, and security.

### Uploading files through your backend

The most straightforward approach is to let the client send the file to your backend server, and then have the server upload it to S3.

**Here’s why that’s not ideal:**

* **Double handling:** Your server receives the file, buffers it, and then forwards it to S3 — doubling the network I/O and increasing processing time.

* **Server load:** Large files can consume memory and bandwidth, especially when multiple users upload concurrently.

* **Latency:** The user waits for the file to upload to your server and then to S3, which slows down the perceived performance.

While simple to implement, this architecture doesn't scale well, especially when handling large files or high volumes of uploads.

### Letting the client upload directly to S3

To avoid server bottlenecks, a common alternative is to let the client upload directly to S3. In this model, the user sends the file straight to S3 from the frontend, and once the upload finishes, the client notifies your backend.

**This improves efficiency but introduces two major concerns:**

* **Security risk:** Uploading directly requires credentials with permission to s3:PutObject. Exposing AWS credentials in frontend code is a security risk — they can be extracted and misused.

* **Unreliable notifications:** The client is responsible for notifying the backend after the upload. But what if the user closes their browser before the notification is sent? Your system may never learn that a file was uploaded.

Clearly, both options have trade-offs. What we need is a secure, efficient way to upload files from the client — without overloading the backend — while also ensuring the backend is reliably notified and can process the uploaded content.

## Solution

To solve both the performance and reliability problems, we can rethink the flow by combining several AWS features — presigned URLs, S3 event notifications, and AWS Lambda.

**Here’s how it works:**

1. The backend generates a presigned URL and returns it to the client. Optionally, it can also store metadata about the expected upload in a database.

2. The client uploads the file directly to S3 using the presigned URL.

3. Once the upload completes, S3 triggers a Lambda function via an event notification.

4. The Lambda processes the uploaded file and stores any necessary metadata in the backend database — such as size, type, custom S3 metadata, or the result of scanning or parsing the file.

This gives you the best of both worlds:

* Fast and secure direct uploads from the client to S3

* No exposure of AWS credentials

* Guaranteed backend processing without relying on the client to notify anything

Let’s break down each part.

### Backend: Generating a presigned POST URL

Using the AWS SDK, we can generate a presigned POST with custom conditions and expiration. Here’s an example in TypeScript:
```typescript
// upload/presign.ts
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { randomUUID } from "crypto";

const s3 = new S3Client({ region: "us-east-1" });
const BUCKET = process.env.BUCKET_NAME!;

export async function createPresignedUpload(userId: string, contentType: string) {
  const key = `uploads/${randomUUID()}`;

  const { url, fields } = await createPresignedPost(s3, {
    Bucket: BUCKET,
    Key: key,
    Conditions: [
      ["eq", "$Content-Type", contentType], // Enforces exact content type
      ["eq", "$x-amz-meta-user-id", userId], // Enforce user ID is sent in metadata
      ["starts-with", "$x-amz-meta-name", ""], // Enforce frontend to provide file name
      ["content-length-range", 0, 10 * 1024 * 1024], // Limit file size to 10MB
    ],
    Fields: {
      "Content-Type": contentType,
      "x-amz-meta-user-id": userId, 
    },
    Expires: 900, // 15 minutes
  });

  return { url, fields, key };
}
```
**Explanation:** This creates a short-lived URL used to upload the file. The `fields` are pre-filled form values that the client may submit with the upload — these can include known headers like Content-Type as well as custom metadata fields prefixed with x-amz-. The `conditions` block defines the rules that S3 will enforce when validating the upload request.

* The file must not exceed 10 MB.

* The Content-Type must exactly match the expected MIME type.

* The upload must include a custom metadata field x-amz-meta-name, with value provided by the frontend, used to store the original file name.

* A custom metadata field x-amz-meta-user-id must be included. This demonstrates how to pass metadata into the upload — in this example, the userId could come from your database or be extracted from a decoded JWT, allowing uploads to be tied to a specific user.

S3 enforces these conditions at the time of upload. Any missing or mismatched field will cause the upload to fail. Note that only known headers and metadata fields prefixed with `x-amz-meta-` are stored as custom metadata — other arbitrary fields are ignored.

### Frontend: Upload file and attach metadata

```typescript
async function uploadFile(file: File) {
  // 1. Request upload parameters from backend
  const res = await fetch("/api/upload/presign", {
    method: "POST",
    body: JSON.stringify({
      contentType: file.type,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const { url, fields, key } = await res.json();

  // 2. Construct form data with all backend-provided fields
  const formData = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    formData.append(k, v as string);
  });
  
  // 3. Frontend adds its required metadata (enforced by backend policy)
  formData.append("x-amz-meta-name", file.name);

  // 4. Final field must be the actual file
  formData.append("file", file);

  // 5. Upload directly to S3
  const uploadRes = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!uploadRes.ok) {
    throw new Error("Upload failed");
  }

  console.log("Upload succeeded:", key);
}
```

### 3. S3 Triggers Lambda

S3 can emit **event notifications** when certain actions occur on a bucket—like when a new object is created, deleted, or restored. These events can be used to trigger downstream processing automatically, such as invoking a Lambda function.

**Common use case:** Trigger a Lambda function every time a new file is uploaded to a specific folder in a bucket (e.g., for image processing, virus scanning, or moving data into a database).

**Setting up S3 as a Lambda trigger (via AWS Console):**

1. Go to the S3 bucket where files are uploaded.

2. Click “Properties”, then scroll down to “Event notifications”.

3. Click “Create event notification”.

4. Configure the event:

Name the event.

Event type: choose POST (for presigned URL uploads), or other types as needed.

Prefix/Suffix: optionally limit to a folder or file type, e.g.:

Prefix: uploads/

Destination: choose Lambda Function, then select an existing Lambda from the dropdown.

Confirm permissions:

S3 must be allowed to invoke your Lambda. If it’s not already, you’ll be prompted to grant permissions automatically.

Once set up, any new file matching the criteria will automatically trigger the selected Lambda with an event payload containing metadata about the file (e.g. bucket name, key, size, etc.).

### 4. Lambda: Process the uploaded file

Once S3 triggers the Lambda function (as set up earlier), the function can access event metadata and retrieve the uploaded object's details from S3, storing the metadata in the database.

```typescript
// lambda/process-upload.ts
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { S3Event } from "aws-lambda";
import { randomUUID } from "crypto";
import { uploadRepo } from "./upload-repo";

const s3 = new S3Client({});

export const handler = async (event: any) => {
  const record = event.Records?.[0];
  if (!record) throw new Error("No S3 record found");

  const bucket = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

  const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));

  const contentType = head.ContentType;
  const size = head.ContentLength;
  const userId = head.Metadata?.["user-id"];
  const originalName = head.Metadata?.["name"];

  if (!userId || !originalName) {
    throw new Error("Missing required metadata");
  }

  await uploadRepo.save({
    id: randomUUID(),
    bucket,
    key,
    size,
    contentType,
    userId,
    originalName,
  });

  console.log("Upload metadata saved:", { bucket, key });
};
```
### 5. Tradeoffs

Like everything in software engineering, this approach is not a silver bullet. It solves many problems—offloading traffic to S3, reducing backend load, and enabling secure, scalable uploads—but comes with tradeoffs:

* **Asynchronous processing:** The upload is processed asynchronously. If the client needs to wait for the file to be fully processed (e.g. metadata stored in a DB), it must implement polling mechanism to be notified when the file is ready.

* **No early validation of file content:** Since the upload goes directly to S3, your backend only sees the file after it lands. You can enforce structure (e.g. content type, size, custom metadata) at upload time via presigned policy conditions, but you can't inspect or reject the file contents in advance.

* **Complexity:** The solution is more complex than a simple direct upload.

## Conclusion

Pre-signed POST uploads with S3 offer a clean and scalable way to accept files directly from clients — enforcing structure with upload policies and enriching the process with metadata. Combined with S3 event triggers and Lambda, it becomes easy to build automated pipelines that respond to new uploads in near real-time. Just remember: this pattern is asynchronous, so systems that expect immediate results must account for it. When used thoughtfully, it’s a lightweight and powerful foundation for modern file upload flows.


