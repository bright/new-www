---
author: kuba-s
tags:
  - s3
  - AWS
date: 2025-05-13T09:00:00.000Z
meaningfullyUpdatedAt: 2025-05-13T09:00:00.000Z
title: Faster and Smarter - Improving File Uploads with S3 Multipart, Pre-Signed
  URLs and S3 Transfer Acceleration
layout: post
image: /images/improving-large-files-s3-uploads.png
hidden: false
comments: true
published: true
language: en
---
**Uploading large files to S3 can be slow and unreliable over weak networks. Using multipart upload with pre-signed URLs improves speed, reliability, and security by allowing parallel uploads directly from the client. A lifecycle policy can automatically clean up abandoned uploads to avoid storage costs. S3 Transfer Acceleration speeds up uploads and downloads globally by routing traffic through AWS edge locations. It’s easy to enable and only charges if it improves performance.**

## Uploading large files to S3

Amazon S3 is one of the most reliable and scalable object storage services available today. It’s widely used for storing everything from static website assets to massive data archives, video libraries, backups, and logs. However, uploading large files to S3 isn’t as simple as doing a `PUT` request and calling it a day. Several challenges come into play, especially when network conditions are less than ideal.

**Let's explore why:**

* **Unreliable Networks:** In real-world scenarios, users may upload files over shaky connections — think mobile devices, public Wi-Fi, or spotty home internet. A single dropped connection during a large upload can force the entire operation to start over if not handled correctly.

* **Single Connection Limitations:** A standard HTTP `PUT` upload streams the file over a single HTTP connection. Due to TCP throughput limitations, this often leads to underutilized bandwidth.

Clearly, uploading large files over the internet is more fragile and slower than it should be. Anyone who has ever tried to upload a file over 1 GB on a flaky connection knows just how painful the process can be. Fortunately, S3 provides a purpose-built solution to address these challenges: **S3 multipart upload**.

## Introducing multipart upload: S3 solution for large files

To make large file uploads more reliable and performant, AWS offers the **Multipart Upload** feature in S3. Instead of sending the entire file in a single request, the file is broken into smaller parts that can be uploaded independently — and in parallel.

AWS provides clear guidelines around when to use multipart upload:

* **Recommended:** For files larger than **100 MB**, AWS recommends using multipart upload to improve speed and resilience.

* **Required:** For files over **5 GB**, multipart upload is mandatory. You cannot upload files of this size using a regular `PUT` request.

This approach has multiple advantages:

* **Failed parts can be retried individually.**
* **Uploads can proceed in parallel, making better use of available bandwidth.**
* **You gain greater control over error handling and progress tracking.**

By leveraging multipart upload, developers can build upload flows that are faster, more resilient, and much better suited to real-world network conditions. 

## Secure uploads with pre-signed urls

When uploading directly to S3, you normally need to provide valid AWS credentials with permissions to `s3:PutObject`. Exposing those credentials in a frontend app is a big no-no — they can be misused if leaked.

That’s where **pre-signed URLs** come in. A pre-signed URL grants temporary permission to upload a file directly to S3, without exposing any sensitive credentials. They’re:

* **Time-limited** (you define expiration)
* **Scope-limited** (you define exactly what operation they allow)
* **Ideal for frontend uploads** (web, mobile, etc.)

You can combine pre-signed URLs with multipart uploads to securely and efficiently upload large files directly from the client.

## Implementing multipart upload with pre-signed URLs in TypeScript

Let’s walk through an example implementation of multipart upload using pre-signed URLs. This approach allows your frontend to upload large files directly to S3, securely and efficiently, without exposing credentials.

We’ll expose three backend endpoints:

* **Initialize Upload** – Starts a multipart upload and returns an UploadId.
* **Generate Pre-Signed URLs** – Creates pre-signed URLs for each part.
* **Finalize Upload** – Completes the upload after all parts have been uploaded.

1. **Backend: Initialize Upload**

```typescript
// POST /api/upload/init
export async function initMultipartUpload(
  key: string,
  contentType: string
) {
  const response = await s3.send(
    new CreateMultipartUploadCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    })
  );

  return {
    uploadId: response.UploadId!,
    key,
  };
}
```
**Explanation**: This starts the multipart process and returns an UploadId, which is required to upload and track individual parts.

2. **Backend: Generate Pre-Signed URLs**

```typescript
// POST /api/upload/presign
export async function generatePresignedUrls(
  key: string,
  uploadId: string,
  parts: number
) {
  const urls = await Promise.all(
    Array.from({ length: parts }, (_, index) => {
      const command = new UploadPartCommand({
        Bucket: BUCKET,
        Key: key,
        UploadId: uploadId,
        PartNumber: index + 1,
      });

      return getSignedUrl(s3, command, { expiresIn: 900 });
    })
  );

  return urls;
}
```
**Explanation**: You generate a pre-signed URL for each part using `UploadPartCommand`, which can be used by the frontend to upload file chunks directly to S3. Keep track of each `PartNumber` to correctly finalize the upload later.

3. **Backend: Complete the Upload**

```typescript
// POST /api/upload/complete
export async function completeMultipartUpload(
  key: string,
  uploadId: string,
  parts: { ETag: string; PartNumber: number }[]
) {
  await s3.send(
    new CompleteMultipartUploadCommand({
      Bucket: BUCKET,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    })
  );
}
```
**Explanation**: S3 will combine all uploaded parts into a single object. If anything goes wrong before this step, the upload remains incomplete.

4. **Frontend: Putting it all together**

Here's a high-level example of how a browser or mobile app can use those endpoints to upload a file in parallel:

```typescript
async function uploadFile(file: File) {
    // 1. Initialize multipart upload
    const { uploadId, key } = await api.initMultipartUpload(file.name, file.type)

    // 2. Split file into parts with your custom logic
    const parts = splitIntoParts(file)

    // 3. Get pre-signed URLs
    const urls = await api.generatePresignedUrls(key, uploadId, parts.length)

    // 4. Upload chunks in parallel
    const uploads = await Promise.all(
        parts.map((part, idx) =>
            fetch(urls[idx], { method: 'PUT', body: part })
                .then((res) => res.json())
                .then((res) => ({
                    ETag: res.headers.get('ETag')!,
                    PartNumber: idx + 1,
                }))
        )
    )


    // 5. Finalize upload
    await api.completeMultipartUpload(key, uploadId, uploads)
}
```
**Explanation**: The file is split into chunks client-side, and each chunk is uploaded using the corresponding pre-signed URL. After all uploads complete, the list of ETag and PartNumber values is sent to the backend to finalize the multipart upload.

5. **Bonus: Automatically clean up incomplete uploads**

As a best practice, you can configure an S3 lifecycle policy to automatically delete incomplete multipart uploads after a set number of days. This keeps your bucket clean and avoids unexpected storage costs.

## Supercharging uploads with S3 Transfer Acceleration

When users upload large files from across the globe, network latency and distance from the S3 bucket region can significantly slow down the process. S3 Transfer Acceleration is designed to solve exactly this problem — by leveraging AWS’s global infrastructure to speed up data transfers to and from S3.

S3 Transfer Acceleration works by routing your uploads and downloads through the nearest **AWS Edge Location** using the Amazon CloudFront network. Once a file reaches an edge location, it travels over the **AWS global backbone**, a high-speed and low-latency network that connects AWS regions around the world.

Instead of sending data all the way to your S3 bucket’s region over the public internet, users send it to the closest AWS edge server. This drastically reduces latency and improves upload (and download) performance, especially for users far from the bucket’s region.

You can enable Transfer Acceleration in the bucket’s **Properties** tab in the S3 console. Once enabled, two special endpoints become available for use in your applications:

* `https://<bucket-name>.s3-accelerate.amazonaws.com`
* `https://<bucket-name>.s3-accelerate.dualstack.amazonaws.com` (for IPv6 support)

Using either of these endpoints with your S3 client enables accelerated data transfers. If Transfer Acceleration doesn’t improve performance, AWS will compare the results and won’t charge you for using it.

## Conclusion

S3 multipart upload with pre-signed URLs is a powerful and flexible way to upload large files to S3. It provides a secure and efficient way to upload files directly from the client, while also allowing for better error handling and progress tracking. S3 Transfer Acceleration is a further improvement that can speed up uploads and downloads globally by routing traffic through AWS edge locations.





