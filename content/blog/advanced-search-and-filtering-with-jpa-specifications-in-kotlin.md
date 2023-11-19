---
author: tomasz-sch
tags:
  - Kotlin
  - jpa
  - spring
date: 2023-02-15T09:58:55.113Z
meaningfullyUpdatedAt: 2023-02-15T09:58:55.125Z
title: Advanced Search and Filtering with JPA Specifications in Kotlin
layout: post
image: /images/blogpost_search-1-.png
hidden: false
comments: true
published: true
language: en
---
Creating an advanced api search can become a challenge. If we want to filter based on a lot of properties, using the standard JPA Repository approach can turn out to be hard to maintain and not too flexible. In this blog post I will demonstrate how we can make use of JPA Specifications for that purpose.

## Test Scenario

Let’s consider an example where we want to be able to search for customers based on their properties.

The entity looks like this:

```kotlin
@Entity
 class Customer(
    @Id
    val uuid: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val age: Int,
    val status: CustomerStatus
 )
```

## Using JPA Repository

One of the approaches would be to implement a repository extending the JPARepository interface with custom search methods. 

```kotlin
@Repository
interface CustomerRepository: JpaRepository<Customer, String> {
    fun findByFirstName(firstName: String): List<Customer>
    fun findByLastName(firstName: String, lastName: String, pageable: Pageable): List<Customer>
    fun findByEmail(emailAddress: String): Customer?
}
```

JPA can even handle paging and sorting for us out of the box and we don’t need to write any queries as they are derived from method names.

Looks pretty straightforward and convenient, right? 

## JPA Specifications

What if we want to be able to have a more advanced search based on more properties or a combination of properties, like: first name and last name, email and status, etc.? We will need to create more and more repository methods as we can only specify a fixed number of criteria for them and we won’t be able to reuse existing ones. 

As the application grows this will quickly lead us to an increased number of repository methods and a lot of ifology in the service layer which is a horrible idea.

And here is where JPA Specifications come in handy. It allows us to define reusable predicates which we can utilize to create dynamic queries on demand. 

In order to start we first need to add a kotlin-kapt plugin and kotlin-jpa-specification-dsl library into our application:

## Initial setup

```kotlin
plugins {
    kotlin("kapt") version "1.5.20"
}

dependencies {
kapt("org.hibernate:hibernate-jpamodelgen:5.4.12.Final")
}
```

Kapt is a Kotlin annotation processor tool which is required by jpamodelgen library. The library generates Java source files for each entity class with metadata required for specifications. 

Our metadata class for customer entity looks like this after auto generation: 

```kotlin
@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Customer.class)
public abstract class Customer_ {

	public static volatile SingularAttribute<Customer, String> firstName;
	public static volatile SingularAttribute<Customer, String> lastName;
	public static volatile SingularAttribute<Customer, String> uuid;
	public static volatile SingularAttribute<Customer, String> email;
	public static volatile SingularAttribute<Customer, Integer> age;

	public static final String FIRST_NAME = "firstName";
	public static final String LAST_NAME = "lastName";
	public static final String UUID = "uuid";
	public static final String EMAIL = "email";
	public static final String AGE = "age";

}
```

## JPA Specification Executor

To use specifications abstraction we need to adjust our a repository to implement JpaSpecificationExecutor interface, so our updated repository looks like this:

```kotlin
@Repository interface CustomerRepository : JpaSpecificationExecutor<Customer>, JpaRepository<Customer, String>
```

The JpaSpecificationExecutor interface provides us with a couple of default methods that know how to handle Specifications (findOne, count, exists, etc).

Last part is to define reusable Specification filters. 

Let’s hold them in a custom class:

## Custom Specifications

```kotlin
class CustomerSpecification {

    companion object {
        fun uuidEquals(uuid: String): Specification<Customer> {
            return Specification { root, _, criteriaBuilder ->
                criteriaBuilder.equal(root.get(Customer_.uuid), uuid)
            }
        }

        fun customerFirstNameEquals(firstName: String?): Specification<Customer> {
            return Specification { root, _, criteriaBuilder ->
                firstName?.let {
                    criteriaBuilder.equal(root.get(Customer_.firstName), it)
                }
            }
        }

        fun customerLastNameEquals(lastName: String?): Specification<Customer> {
            return Specification { root, _, criteriaBuilder ->
                lastName?.let {
                    criteriaBuilder.equal(root.get(Customer_.lastName), it)
                }
            }
        }

        fun customerEmailEquals(email: String?): Specification<Customer> {
            return Specification { root, _, criteriaBuilder ->
                email?.let {
                    criteriaBuilder.equal(root.get(Customer_.lastName), it)
                }
            }
        }

        fun customerStatusEquals(status: CustomerStatus?): Specification<Customer> {
            return Specification { root, _, criteriaBuilder ->
                status?.let {
                    criteriaBuilder.equal(root.get(Customer_.status), it)
                }
            }
        }
    }
}
```

For this blog post I have defined only a couple of basic specifications for each entity field but there is nothing stopping us from having more complex ones including sub entities, etc.

Also all of the method parameters are nullable. If the value is null, the method will simply return an empty specification which will be ignored during search. That way we do not really need any additional validation for those values.

## Specifications usage on repository

Now when we have defined granular specifications for each of the columns, we can finally dive into how to use them in practice. For that reason we created a simple CustomerQuery data class that holds all available filters.

```kotlin
private fun getCustomers(queryObject: CustomerQuery, pageable: Pageable): Page<Customer> {
        val customers = customerRepository.findAll(
            customerFirstNameEquals(queryObject.firstName)
                .and(customerLastNameEquals(queryObject.lastName))
                .and(customerEmailEquals(queryObject.email))
                .and(customerStatusEquals(queryObject.status)),
            pageable
        )

        return customers
    }
```

And this is it! We can now combine each of the granular specifications in whatever combination we want without the need of adding a new method for every use case like we would do with the standard JPA Repository approach.

<div className="block-button"><h2>Come to the Bright Side</h2><div>Join our team and work on projects such as the Ethereum blockchain platform, accounting software, or web therapy applications. Work with clients from Israel, Germany, or Norway!</div><a href="/career"><button>check our career opportunities</button></a></div>
