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
hidden: true
comments: true
published: false
language: en
---
## Introduction

Data deduplication is a critical process in data preprocessing, especially when working with extensive datasets. Duplicate records can skew analyses and impact machine learning model accuracy. In this tutorial, we explore data deduplication using Python's RecordLinkage package, paired with Pandas for data manipulation. This approach is particularly useful in scenarios like customer database management, where duplicate entries can lead to inefficient marketing and customer service efforts.

The data deduplication process described in the tutorial using the RecordLinkage package is an example of unsupervised duplicate detection.

In unsupervised duplicate detection, the algorithm tries to identify duplicates without any prior training data that labels records as duplicates or non-duplicates. The RecordLinkage library, in this case, uses various algorithms and similarity measures (like Jaro-Winkler for string comparison) to compare and score pairs of records across the dataset. It then identifies potential duplicates based on these similarity scores, usually according to a predefined threshold.

## Setting Up the Environment with Miniconda

First, ensure your environment is set up using Miniconda:

1. **Install Miniconda**: Download from [Miniconda's website](https://docs.conda.io/en/latest/miniconda.html) and follow the installation instructions.
2. **Create and Activate a New Conda Environment**:

   ```bash
   conda create --name deduplication python=3.8
   conda activate deduplication
   ```
3. **Install Required Packages**:

   ```bash
   conda install -c conda-forge recordlinkage pandas
   ```

## Step 1: Loading the Febrl Dataset

Load the sample Febrl dataset provided by the RecordLinkage package. This dataset is a synthetic dataset similar to what you might find in a customer database, containing duplicates:

```python
import pandas as pd
import recordlinkage

df_a, df_b = recordlinkage.datasets.load_febrl4()
```

### Exploring the Dataset

Inspect the dataset to understand its structure and content:

```python
print(df_a.head())
```

**Example Output:**

```
        given_name    surname street_number            address_1 address_2
rec_id                                                                   
rec-1070-org   michaela   neumann            8       stanley street    miami
rec-1016-org   courtney   painter           12    pinkerton circuit  banyo
rec-4405-org    charles     green           38  salkauskas crescent  kambah
rec-1288-org    vanessa      parr          905       macquoid street  toowoomba
rec-3585-org    mikayla   malloney           37        randwick road  hawker
```

## Step 2: Data Preprocessing

Data preprocessing is a critical step in ensuring the quality of your deduplication efforts. The objective here is to clean and standardize your data, making it suitable for comparison. This involves addressing missing values, normalizing data formats, and potentially converting data types for consistency.

In the code snippet, we replace all missing values with empty strings in both datasets (`df_a` and `df_b`). This uniform approach to missing data ensures that comparisons are not skewed by null values.

```python
df_a.fillna('', inplace=True)
df_b.fillna('', inplace=True)
```

## Step 3: Indexing

Indexing is the process of creating candidate links between records, which might refer to the same entity. This step is crucial as it sets the stage for how records will be compared.

The `indexer.full()` method creates a full index, which compares every record in `df_a` with every record in `df_b`. This comprehensive approach is useful for small datasets but can be computationally expensive for larger datasets.

```python
indexer = recordlinkage.Index()
indexer.full()
candidate_links = indexer.index(df_a, df_b)
```

## Step 4: Comparing Records

Comparing records is the heart of the deduplication process. This step involves applying various algorithms to measure similarities between record pairs.

* `compare_cl.exact('given_name', 'given_name')` checks for exact matches in the 'given_name' field.
* `compare_cl.string('surname', 'surname', method='jarowinkler', threshold=0.85)` uses the Jaro-Winkler method to compare surnames, a more forgiving measure that can identify similarities even with minor discrepancies.

These comparisons yield a set of features indicating the level of similarity between each pair of records.

```python
compare_cl = recordlinkage.Compare()
compare_cl.exact('given_name', 'given_name', label='given_name')
compare_cl.string('surname', 'surname', method='jarowinkler', threshold=0.85, label='surname')
features = compare_cl.compute(candidate_links, df_a, df_b)
```

**Example Output:**

```
               given_name  surname
rec_id_1    rec_id_2                      
rec-1070-org rec-282-org           1        0
             rec-1685-org          1        0
             rec-1056-org          1        0
             rec-1216-org          1        0
             rec-1508-org          1        0
```

## Step 5: Classifying Matches

The classification step involves analyzing the comparison features to distinguish between matches and non-matches. A common approach is to set a threshold for the sum of comparison scores. Pairs scoring above this threshold are considered matches.

```python
matches = features[features.sum(axis=1) > 1]
print(matches)
```

**Example Output:**

```
               given_name  surname
rec_id_1    rec_id_2                      
rec-1070-org rec-5114-org          1        1
             rec-3403-org          1        1
rec-1016-org rec-1936-org          1        1
```

## Step 6: Analyzing the Results with Pandas

Finally, we use Pandas to analyze the matched records. This step allows for a detailed examination of the potential duplicates identified by the model, offering insights into the deduplication process's effectiveness.

```python
matched_records = df_a.loc[matches.index.get_level_values(0)]
print(matched_records.head())
```

**Example Output:**

```
        given_name  surname street_number         address_1   address_2
rec_id                                                                  
rec-1070-org ...
```

## Summary

Supervised duplicate detection using the RecordLinkage package in Python is a powerful method for identifying duplicate records in datasets. This approach is particularly valuable in scenarios where maintaining a single, accurate record for each entity is crucial, such as in customer databases, medical records, and other similar applications. By following the steps of preprocessing, indexing, comparing, classifying, and analyzing, we can effectively identify and handle duplicate entries, leading to cleaner, more reliable datasets for further analysis or model training.