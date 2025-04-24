---
author: radek-l
tags:
  - QA
date: 2025-04-24T11:13:39.650Z
meaningfullyUpdatedAt: 2025-04-24T11:13:39.660Z
title: Custom Jest Matcher for Asserting Spreadsheets
layout: post
image: /images/custom_jest_matcher.png
hidden: false
comments: false
published: true
language: en
---
**When working with matrix-like data in tests — think CSVs, XLSX, reports, or table-based API responses — comparing nested arrays or tabular structures can be a pain. Figuring what bit of data was faulty can be tricky, especially in big files. Let's fix that by implementing a custom matcher which visually prints the differences in the terminal in an eye-friendly and intuitive way.**

## The Matcher code

Here’s a custom matcher for Jest: `toEqualTable`, with built-in inline diffing for terminal-friendly debugging

```typescript
import {AsciiTable3} from "ascii-table3";
const chalk = require('chalk');

export type HasTabularData = { data: any[][] }
export type TableMatcherData = HasTabularData | any[][]

function inlineDiffRenderer(result: any[][]) {
    const legend = `Valid / ${chalk.yellowBright.bgRedBright('Actual')} / ${chalk.yellowBright.bgGreenBright('Expected')}`;
    const table = new AsciiTable3()
        .setTitle(legend)
        .setAlignCenter(3)
        .setStyle('unicode-single')
        .addRowMatrix(result);

    console.log(table.toString());
}

export const jestTableMatchers = {
    toEqualTable(actual: TableMatcherData, expected: TableMatcherData) {
        const actualData = Array.isArray(actual) ? actual : actual.data;
        const expectedData = Array.isArray(expected) ? expected : expected.data;

        const rows = Math.max(actualData.length, expectedData.length);
        const cols = Math.max(
            ...actualData.map(r => r.length),
            ...expectedData.map(r => r.length)
        );

        let pass = true;
        const result: any[][] = [];
        const resultMessages: string[] = [];

        for (let i = 0; i < rows; i++) {
            const row: any[] = [i];
            for (let j = 0; j < cols; j++) {
                const a = actualData[i]?.[j] ?? null;
                const e = expectedData[i]?.[j] ?? null;

                if (a === e) {
                    row.push(a);
                } else {
                    pass = false;
                    row.push(`${chalk.yellowBright.bgRedBright(a)} / ${chalk.yellowBright.bgGreenBright(e)}`);
                    resultMessages.push(`[${i}][${j}] ${a} != ${e}`);
                }
            }
            result.push(row);
        }

        if (!pass) inlineDiffRenderer(result);

        return {
            pass,
            message: () => pass ? '' : resultMessages.join('\n'),
        };
    },
};

expect.extend(jestTableMatchers);
```

## Example test

```typescript
describe('(THESE TESTS ARE SUPPOSED TO FAIL SO YOU CAN SEE THE DIFF IN TERMINAL) toEqualTable', () => {
    test('plain arrays: fails if values in cells are not equal', () => {
        const expected = [
                ["First name", "Last name", "Age", "Type"],
                ["John", "Doe", 30, "Admin"],
                ["Adam", "Smith", 40, "Admin"],
                ["Rose", "Gatsby", 35, "User"]
            ]

        const actual = [
                ["First name", "Last name", "Age", "Type"],
                ["John", "Doe", , "Admin"],
                ["Radek", "Smith", 40, "Admin"],
                ["Rose", "Gatsby", 35, "User"]
            ]

        expect(actual).toEqualTable(expected);
    });
});
```

When the test fails, you'll see a colorful inline diff in your terminal. Mismatches are rendered in colours:

<div className="image">![Test output highlighting the incorrect and expected values](/images/screenshot-2025-04-24-at-13.22.56.png "Test output highlighting the incorrect and expected values")</div>

## Summary

We've implemented a custom Jest matcher `toEqualTable` for asserting tabular data like spreadsheets. It visually highlights mismatches using `ascii-table3` and `chalk` directly in the terminal, making failed tests easier to debug. The matcher supports both raw matrix inputs and structured objects. Ideal for testing CSV-like data or tables with precision and readability. You can consider writing your own renderers and show differences by creating an XLSX file with colorful formatting.

What helpers and utils do you implement to make it easier to work with your tests?