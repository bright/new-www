---
author: radek-l
tags:
  - automation testing
date: 2025-03-27T11:26:01.571Z
meaningfullyUpdatedAt: 2025-03-27T11:26:01.576Z
title: Static Files vs. Dynamically Generated Files in Test Code
layout: post
image: /images/files_test_code.png
hidden: false
comments: false
published: false
language: en
---
**In the previous article we've covered [basic guidelines of working with files in test automation](/blog/automated-tests-with-files-guidelines/). Today let's go deeper. At some point developers must decide whether to use static files stored in the repository or generate them dynamically during test execution. Each approach has its advantages and disadvantages. Let's explore both methods in detail.**

## Static Files Stored in Repository

Static files are pre-created and stored in the repository, ie:

* In `src/file-processing/test-fixtures`

  * `valid.csv, empty-file.csv, 100-rows.csv, missing-first-name-column.csv`

### Advantages of Static Files

1. **100% Compliant with Production Usage** – Users upload files through Web interface and you use the same files in your code - full match.
2. **Proper Domain Entity Representation** – Files are easily understandable by both technical and business stakeholders.
3. **Serves as Documentation** – Provides clear examples of supported file formats.
4. **Usable in Manual Testing and Demos** – Testers and demo users can easily use these files.
5. **Intuitive for Humans** – No need to interpret test code to understand file contents.
6. **Clearly Defines System Specification** – Quickly answers, "What kinds of files are supported in our system?"

### Disadvantages of Static Files

1. **Difficult to Maintain** – Modifying multiple files (e.g., adding a new column) is cumbersome.
2. **Editing Requires Dedicated Software** – XLSX files require Excel or a similar application.
3. **Poor Git Diff Readability** – Changes to binary files are not human-readable in version control.
4. **Not Compilation Aware** – Changes in system requirements (e.g., making a column required) do not trigger test updates.
5. **Risk of Outdated Test Files** – Without clear enforcement, files may not reflect schema changes.
6. **High Maintenance Overhead** – Complex schemas may require dozens of files for different test cases.

## Dynamically Generated Files During Test Execution

Instead of storing test files in the repository, they can be generated on demand. Example code:

```typescript
// valid.csv
type HeaderType = [string, string, string, string]

const header: HeaderType = ['First Name', 'Last Name', 'Age', 'Salary']; 
const rows = [ 
['John', 'Doe', '30', '50000'], 
['Jane', 'Smith', '25', '60000'], 
['Alice', 'Johnson', '35', '70000'], 
]; 

// createCSV function writes file to file system and returns its path
const validFile: HeaderType = createCSV('valid.csv', header, rows);

// missing-data.csv
const header = ['First Name', 'Last Name', 'Age', 'Salary']; 
const rows = [ 
['John', 'Doe', '30', ''], 
['', 'Smith'], 
['Alice', '', '35', '70000'],
[]
]; 

const missingDataFile = createCSV('missing-data.csv', header, rows);
```

**\*HeaderType** is also used in production code which ensures compilation time safety of the files*

### Advantages of Dynamically Generated Files

1. **Compilation Aware** – Changes in data models automatically reflect in test cases, making your test files impossbile to desynchronize with application
2. **Type-Safe and Reliable** – When using with strongly typed languages it enforces correct structure using types and classes in compilation time
3. **Easy to Modify and Extend** – Developers can quickly add or modify test cases.
4. **Facilitates Randomized and Large Data Sets** – Useful for performance and uniqueness constraints.
5. **Integrates with Technical Endpoints** – Can be exposed as a test data API for manual testers.

### Disadvantages of Dynamically Generated Files

1. **Less Directly Compliant with Production Usage** – May not precisely mirror real-world files. Writing CSV and XLSX files to disk can be done in many standards and encodings. Often times the file created in Google Sheets, Numbers and node-xlsx library will differ in their behaviour in some nuances
2. **Harder to Communicate with Non-Technical Stakeholders** – You cannot take this peace of code and show it to your Product Owner to describe what your system accepts. It's too abstract and technical.
3. **Less Immediately Readable** – A static CSV file is easier to understand at a glance than CSV generation code.

## Conclusion

Both static files and dynamically generated test files have their place in software testing. Static files provide clarity and domain compliance, while dynamic generation offers flexibility and maintainability. The best approach often depends on the complexity of the system, the frequency of changes, and the need for collaboration with business stakeholders.

A hybrid approach—where core test cases use static files and more complex or frequently changing scenarios leverage dynamic generation—can offer the best of both worlds. More on that in future posts.