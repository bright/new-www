---
author: patryk sz
tags:
  - python
  - deduplication
  - recordlinkage
  - pandas
  - machine learning
date: 2023-11-29T18:26:47.030Z
meaningfullyUpdatedAt: 2023-11-29T18:26:47.044Z
title: Data Deduplication in Python with RecordLinkage
layout: post
image: /images/deduplication.png
hidden: false
comments: true
published: true
language: en
---
# Supervised Duplicate Detection with RecordLinkage and Pandas: A Febrl Dataset Tutorial

## Introduction

Duplicate detection is a critical process in data preprocessing, especially when dealing with large datasets. Duplicate records can skew analyses and impact the accuracy of machine learning models. In this tutorial, we explore data deduplication using Python's RecordLinkage package, paired with Pandas for data manipulation. This approach is particularly valuable in contexts like customer database management, where duplicate entries can result in inefficient marketing and customer service strategies.

## Setting Up the Environment with Miniconda

Ensure your environment is correctly set up using Miniconda:

1. **Install Miniconda**: Download and install Miniconda from [here](https://docs.conda.io/en/latest/miniconda.html).
2. **Create and Activate a New Conda Environment**:
   ```bash
   conda create --name deduplication python=3.8
   conda activate deduplication
   ```
3. **Install Required Packages**:
   ```bash
   conda install -c conda-forge recordlinkage pandas
   ```

Certainly! I'll update the paragraph from your blog post with the more detailed example from the RecordLinkage page and format the output as a Markdown table.

---

## Step 1: Loading the Febrl Dataset

Utilize the RecordLinkage package to load the Febrl dataset, a synthetic dataset typical of what you might find in a customer database. This dataset contains duplicates and is structured with comprehensive personal details:

```python
import pandas as pd
import recordlinkage

df_a, df_b = recordlinkage.datasets.load_febrl4()
```

### Exploring the Dataset

Examine the dataset to understand its structure, which includes names, addresses, and other personal information:

```python
print(df_a.head())
```

**Example Output:**

```markdown
| rec_id       | given_name | surname  | street_number | address_1        | address_2       | suburb         | postcode | state | date_of_birth | soc_sec_id |
|--------------|------------|----------|---------------|------------------|-----------------|----------------|----------|-------|---------------|------------|
| rec-1070-org | michaela   | neumann  | 8             | stanley street   | miami           | winston hills  | 4223     | nsw   | 19151111      | 5304218    |
| rec-1016-org | courtney   | painter  | 12            | pinkerton circuit| bega flats      | richlands      | 4560     | vic   | 19161214      | 4066625    |
| rec-4405-org | charles    | green    | 38            | salkauskas crescent | kela          | dapto          | 4566     | nsw   | 19480930      | 4365168    |
| rec-1288-org | vanessa    | parr     | 905           | macquoid place   | broadbridge manor | south grafton | 2135     | sa    | 19951119      | 9239102    |
| rec-3585-org | mikayla    | malloney | 37            | randwick road    | avalind         | hoppers crossing| 4552     | vic   | 19860208      | 7207688    |
```

This Markdown table showcases the first few entries from the Febrl dataset `df_a`. It includes various fields like `given_name`, `surname`, `address_1`, and `date_of_birth`, providing a detailed view of the data structure used in the deduplication process.


## Step 2: Data Preprocessing

Data preprocessing is a critical step in ensuring the quality of your deduplication efforts. The objective here is to clean and standardize your data, making it suitable for comparison. This involves addressing missing values, normalizing data formats, and potentially converting data types for consistency.

In the code snippet, we replace all missing values with empty strings in both datasets (`df_a` and `df_b`). This uniform approach to missing data ensures that comparisons are not skewed by null values.

```python
df_a.fillna('', inplace=True)
df_b.fillna('', inplace=True)
```

## Step 3: Indexing

Indexing is the process of creating candidate links between records, which might refer to the same entity. This step is crucial as it sets the stage for how records will be compared.

While `indexer.full()` creates a comprehensive index by comparing every record in one dataset (`df_a`) with every record in another (`df_b`), this method can be computationally expensive, especially for large datasets. An efficient alternative is to use a blocking method, such as `indexer.block("given_name")`. This approach significantly reduces the number of comparisons, thus speeding up the process.

### Understanding Block Indexing:
Block indexing works by grouping records based on a specific attribute and only comparing records within the same group. In our example, we use:


```python
indexer = recordlinkage.Index()
indexer.block("given_name")
candidate_links = indexer.index(df_a, df_b)
```

Here’s how it works:
- **Blocking by Given Name**: By invoking `indexer.block("given_name")`, the RecordLinkage indexer will group records from both `df_a` and `df_b` based on the `given_name` attribute. Essentially, it creates blocks of records where the given names are the same.
- **Reduced Comparisons**: Comparisons are only made between records within these blocks. For instance, a record with the given name 'John' in `df_a` will only be compared to records with the given name 'John' in `df_b`.
- **Efficiency**: This focused approach significantly reduces the total number of comparisons needed. It's particularly effective in datasets where a high proportion of records can be excluded from comparison based on a single attribute.

**When to Use Block Indexing**:
- **Large Datasets**: Ideal for large datasets where full indexing might be impractical due to computational constraints.
- **High-Quality Key Attribute**: Most effective when there’s a reliable key attribute (like 'given_name') that can accurately group potential matches.

**Trade-Offs**:
- **Risk of Missing Matches**: If the key attribute used for blocking has inconsistencies (like typos in names), potential matches might be missed.
- **Choosing the Right Attribute**: The effectiveness of blocking depends on choosing an attribute that can effectively discriminate between matches and non-matches.

In summary, using `indexer.block("given_name")` offers an efficient way to perform indexing in duplicate detection tasks, especially when dealing with large datasets or seeking to optimize computational resources. It's a strategic choice in scenarios where the selected blocking attribute is reliable and consistent across the dataset.



## Step 4: Comparing Records

Comparing records is the heart of the deduplication process. This step involves applying various algorithms to measure similarities between record pairs.

These comparisons yield a set of features indicating the level of similarity between each pair of records.

```python
compare_cl = recordlinkage.Compare()
compare_cl.exact('given_name', 'given_name', label='given_name')
compare_cl.string('surname', 'surname', method='jarowinkler', threshold=0.85, label='surname')
compare_cl.exact("date_of_birth", "date_of_birth", label="date_of_birth")
compare_cl.exact("suburb", "suburb", label="suburb")
compare_cl.exact("state", "state", label="state")
compare_cl.string("address_1", "address_1", threshold=0.85, label="address_1")

features = compare_cl.compute(candidate_links, df_a, df_b)
```

**Example Output:**

```markdown
| rec_id_1     | rec_id_2     | given_name | surname |
|--------------|--------------|------------|---------|
| rec-1070-org | rec-282-org  | 1          | 0       |
| rec-1070-org | rec-1685-org | 1          | 0       |
| rec-1070-org | rec-1056-org | 1          | 0       |
| rec-1070-org | rec-1216-org | 1          | 0       |
| rec-1070-org | rec-1508-org | 1          | 0       |
```

## Step 5: Classifying Matches

The classification step involves analyzing the comparison features to distinguish between matches and non-matches. A common approach is to set a threshold for the sum of comparison scores. Pairs scoring above this threshold are considered matches.

```python
matches = features[features.sum(axis=1) > 3]
print(matches)
```

**Example Output:**

```markdown
| rec_id_1     | rec_id_2     | given_name | surname |
|--------------|--------------|------------|---------|
| rec-1070-org | rec-5114-org | 1          | 1       |
| rec-1070-org | rec-3403-org | 1          | 1       |
| rec-1016-org | rec-1936-org | 1          | 1       |
```

## Complete code

```python
import pandas as pd
import recordlinkage
from recordlinkage.datasets import load_febrl4
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load the Febrl dataset
df_a, df_b = load_febrl4()

# Data Preprocessing
df_a.fillna('', inplace=True)
df_b.fillna('', inplace=True)

# Indexing - Create candidate links between records
indexer = recordlinkage.Index()
indexer.block("given_name")
candidate_links = indexer.index(df_a, df_b)

# Comparing Records
compare_cl = recordlinkage.Compare()
compare_cl.exact('given_name', 'given_name', label='given_name')
compare_cl.string('surname', 'surname', method='jarowinkler', threshold=0.85, label='surname')
compare_cl.exact("date_of_birth", "date_of_birth", label="date_of_birth")
compare_cl.exact("suburb", "suburb", label="suburb")
compare_cl.exact("state", "state", label="state")
compare_cl.string("address_1", "address_1", threshold=0.85, label="address_1")

# Classifying Matches
features = compare_cl.compute(candidate_links, df_a, df_b)

# Analyzing the Results with Pandas
matches = features[features.sum(axis=1) > 3]

# Display the first few entries of the dataset and matched records
print("First few entries of df_a:")
print(df_a.head())
print("\nMatched Records:")
print(matches.head())
print("\nNumber of matched records:")
print(len(matches))

```

## Summary

Supervised duplicate detection using the RecordLinkage package in Python is a powerful method for identifying duplicate records in datasets. This approach is particularly valuable in scenarios where maintaining a single, accurate record for each entity is crucial, such as in customer databases, medical records, and other similar applications. By following the steps of preprocessing, indexing, comparing, classifying, and analyzing, we can effectively identify and handle duplicate entries, leading to cleaner, more reliable datasets for further analysis or model training.