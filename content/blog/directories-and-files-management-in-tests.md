---
author: radek-l
tags:
  - automation testing
  - unit-testing
  - nodejs
  - typescript
date: 2025-04-10T10:44:02.111Z
meaningfullyUpdatedAt: 2025-04-10T10:44:02.122Z
title: Directories and files management in tests
layout: post
hidden: false
comments: false
published: true
language: en
---
# TL;DR

1. Create class `StaticTestFilesDirectory` with content provided below
2. Create class `RuntimeTestFilesDirectory`
3. Add `/**/runtime-test-files` to `.gitignore`
4. Write tests using the classes following examples below

# Intro

When working with file-based tests in Node.js, things can get messy fast—especially if there’s no consistency in how test files are handled. You might start off by manually setting up folders or sprinkling file operations throughout `beforeEach` and `afterAll` blocks. Eventually, though, this becomes hard to maintain, prone to errors, and cluttered.

Let’s fix that by introducing a standardized approach to managing test files and directories in your Node.js project using simple wrappers around the native `fs` and `path` modules.



## 🔍 Why It Matters

In test suites that work with files—whether reading static assets or generating runtime outputs—common problems tend to creep in:

* ❌ No consistent folder structure for test files
* ❌ Test outputs accidentally committed because they weren’t ignored
* ❌ Repetitive file-handling logic bloating test setup code
* ❌ Confusion between static inputs and generated outputs

Let’s solve these with two small utility classes.



## ✅ The Conventions

To bring order to the chaos, let’s define two directory types:

* **`static-test-files`**: for static assets checked into the repo
* **`runtime-test-files`**: for runtime-generated files (**should be git-ignored**)

These directories are managed using two classes:

* `StaticTestFilesDirectory`
* `RuntimeTestFilesDirectory`

## 🗂️ StaticTestFilesDirectory

This is a lightweight helper for accessing read-only files stored in your test repo. Use this for input files that are part of your versioned test fixtures.

```typescript
class StaticTestFilesDirectory {
    static defaultFolderName = 'static-test-files';
    readonly directory: string;

    constructor(basePath: string, folder: string = StaticTestFilesDirectory.defaultFolderName) {
        this.directory = path.resolve(basePath, folder);
    }

    path(filePath: string): string {
        return path.resolve(this.directory, filePath);
    }

    readFile(filePath: string, options: BufferEncoding | { encoding: BufferEncoding; flag?: string }): string {
        return fs.readFileSync(this.path(filePath), options);
    }
}
```

### Example Test

```typescript
describe('Static test file usage', () => {
    const staticTestDir = new StaticTestFilesDirectory(__dirname);

    it('returns the absolute path of a static file', () => {
        const absolutePath = staticTestDir.path('test-file.txt');
        
        expect(absolutePath).toBe(path.resolve(__dirname, 'static-test-files', 'test-file.txt'));
    });

    it('reads the contents of a static file', () => {
        const content = staticTestDir.readFile('test-file.txt', 'utf8');
        
        expect(content).toBe('Static test file.');
    });
});

```



## 🛠️ RuntimeTestFilesDirectory

For tests that create temporary files during execution—like generated reports, downloads, or mocks—this class manages a dedicated folder that can be reset and cleared automatically.

```typescript
export class RuntimeTestFilesDirectory {
    static defaultFolderName = 'runtime-test-files';
    readonly directory: string;

    constructor(basePath: string, folder: string = RuntimeTestFilesDirectory.defaultFolderName) {
        this.directory = path.resolve(basePath, folder);
    }

    reset(): void {
        this.clear();
        this.create();
    }

    readFile(filePath: string, options: BufferEncoding | { encoding: BufferEncoding; flag?: string }): string {
        return fs.readFileSync(this.path(filePath), options);
    }

    writeFile(file: string, data: string | NodeJS.ArrayBufferView, options?: fs.WriteFileOptions): void {
        fs.writeFileSync(this.path(file), data, options);
    }

    create(): void {
        fs.mkdirSync(this.directory, { recursive: true });
    }

    clear(): void {
        if (fs.existsSync(this.directory)) {
            fs.rmSync(this.directory, { recursive: true });
        }
    }

    path(filePath: string): string {
        return path.resolve(this.directory, filePath);
    }
}

```



### Example test

```typescript
describe('Runtime-generated test files', () => {
    const runtimeTestDir = new RuntimeTestFilesDirectory(__dirname);

    beforeAll(() => {
        runtimeTestDir.reset(); // Clear and recreate dir once per test run
    });

    it('writes and reads a file', () => {
        const content = 'Runtime test file content';
        runtimeTestDir.writeFile('file.txt', content);

        const saved = runtimeTestDir.readFile('file.txt', 'utf8');
        expect(saved).toEqual(content);
    });

    it('generates a file using external fs calls', () => {
        const filePath = runtimeTestDir.path('another-file.csv');
        fs.writeFileSync(filePath, 'Name,LastName,Age\nRadek,Landowski,22');

        const content = fs.readFileSync(filePath, 'utf8');
        expect(content).toEqual('Name,LastName,Age\nRadek,Landowski,22');
    });
});

```



## 🧼 Final Thoughts

Using wrappers like `StaticTestFilesDirectory` and `RuntimeTestFilesDirectory` may feel like overkill at first—but once your test suite grows and you start juggling dozens of file-based tests, you’ll appreciate the clarity and consistency.

Not only does this approach:

* Reduce boilerplate
* Improve file hygiene
* Prevent accidental git commits of test artifacts

…it also makes your tests easier to debug, understand, and maintain. Simple, clean, and effective.

- - -

🧪 How do you handle test file management in your projects? Let me know—always looking to learn new patterns!