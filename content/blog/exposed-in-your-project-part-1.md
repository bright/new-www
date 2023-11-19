---
author: patryk sz
tags:
  - Exposed
  - kotlin
  - ORM
  - DBAL
  - database
  - framework
date: 2023-03-13T15:56:59.436Z
meaningfullyUpdatedAt: 2023-03-13T15:56:59.449Z
title: Exposed in Your Project - Part 1
layout: post
image: /images/exposed_blog.png
hidden: false
comments: true
published: true
language: en
---
## Overview

In this tutorial, we are going to learn what is and how to use JetBrains/Exposed framework, the DSL approach especially.

[In the previous post](https://brightinventions.pl/blog/exposed-rsql-search-implementation) we did the custom implementation in advance and we extended Exposed framework. Now, we need to make a step back and have a quick look on the Exposed itself.

## Setting up a test application

***NOTE*: For the sake of the test, we use [Ktor](https://ktor.io/) - the easiest way to do so is to use [initializer.](https://start.ktor.io/)**

Once we go through the form, the application frame is ready to work with. Now, we need to add serialization functionality (because we want to return a JSON object as the response).

`build.gradle.ts`

```
plugins {
    ...
    kotlin("plugin.serialization") version "1.8.10"
}

depenendencies {
    ...
    implementation("io.ktor:ktor-server-content-negotiation:2.2.4")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.2.4")
}
```

We *may* need H2 database:

`build.gradle.ts`

```
dependencies {
    implementation("com.h2database:h2:$h2Version")
}
```

## Adding the Exposed

Now, we can add our persistence layer - Exposed ORM:

`build.gradle.ts`

```
dependencies {
    implementation("org.jetbrains.exposed:exposed-core:0.40.1")
    implementation("org.jetbrains.exposed:exposed-jdbc:0.40.1")
}
```

In order to create a database connection and perform the initial db insert, I created Ktor's plugin:

`Data.kt`

```kotlin
package pl.brightinventions.plugins

import pl.brightinventions.dto.CreatePersonDto
import pl.brightinventions.exposed.Database
import pl.brightinventions.persistance.PersonDaoImpl
import pl.brightinventions.persistance.table.PersonTable
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import pl.brightinventions.dto.CreateAddressDto
import pl.brightinventions.persistance.table.AddressTable

fun Application.configureData() {
    Database.register()
    // @TODO("More logic incoming")
}
```

and register it on the application startup:

`Application.kt`

```kotlin
import pl.pl.brightinventionsugins.configureData
import pl.pl.brightinventionsugins.configureRouting
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        install(ContentNegotiation) {
            json()
        }
        configureData()
    }
        .start(wait = true)
}
```

## Persistence layer logic

Once we added Exposed into our environment, it's time to introduce the table's model and some DTOs.

In Exposed, the table's representation is an object:

`PersonTable.kt`

```kotlin
import org.jetbrains.exposed.sql.Table

object PersonTable : Table("person") {
    val id = integer("id").autoIncrement().uniqueIndex()
    val name = text("name")
    val surname = text("surname")
    val age = integer("age")
}
```

Your object table needs to extend from the Exposed `Table`. The content of it is a group of defined columns.
Additionally, I want to show you the relations, so we need one more table:

`AddressTable.kt`

```kotlin
package pl.brightinventions.persistance.table

import org.jetbrains.exposed.sql.Table

object AddressTable : Table("address") {
    val id = integer("id").autoIncrement().uniqueIndex()
    val personId = reference("person_id", PersonTable.id)
    val street = text("street")
    val house = text("house")
    val apartment = text("apartment")
    val city = text("city")
    val postalCode = text("postal_code")
}
```

besides "normal" columns, we defined a reference here: `personId`, which relates to our newly created `PersonTable`

Let's create our Repository with the methods as follows:

`PersonRepositoryImpl.kt` (I skip the Repository interface part - you can check it on the Github repo page)

### get a list of records

```kotlin
override fun findAll(): List<FoundPersonDto> = transaction {
    PersonTable.selectAll().map {
        FoundPersonDto(
            it[PersonTable.id],
            it[PersonTable.name],
            it[PersonTable.surname],
            it[PersonTable.age]
        )
    }
}
```

### get a single record

this is the most questionable one because it can be solved in many ways. For the sake of this article, I want to propose the simplest, two-queries solution: 

```kotlin
override fun find(id: PersonId): FoundPersonWithAddressDto? = transaction {
        val addresses = AddressTable
            .select { AddressTable.personId eq id }
            .map {
                FoundPersonAddressDto(
                    it[AddressTable.street],
                    it[AddressTable.house],
                    it[AddressTable.apartment],
                    it[AddressTable.city],
                    it[AddressTable.postalCode]
                )
            }

        PersonTable.select { PersonTable.id eq id }.firstOrNull()?.let {
            FoundPersonWithAddressDto(
                it[PersonTable.id],
                it[PersonTable.name],
                it[PersonTable.surname],
                it[PersonTable.age],
                addresses
            )
        }
    }
```

as you can see, in the first query we did select all the addresses that belong to a particular person by `personId` relation field. In the next query/mapping, we just assigned fetched list to the new `FoundPersonWithAddressDto` instance.

### create the record

It's a simple operation, but after the execution, we want to return `id` of created records. Because `PersonTable` extends `Table`, we cannot use `insertAndGetId` (which is a part of DAO API which will be explained in the next episode of the series), so we need to do a little trick:

```kotlin
override fun create(person: CreatePersonDto): PersonId = transaction {
    PersonTable.insert {
        it[name] = person.name
        it[surname] = person.surname
        it[age] = person.age
    }.resultedValues!!.map { it[PersonTable.id] }.first()
}
```

### update the record

Pretty straight-forward - update with `where` clause

```kotlin
override fun update(id: PersonId, person: UpdatePersonDto) {
        PersonTable.update({ PersonTable.id eq id }) {
            it[age] = person.age
            it[name] = person.name
            it[surname] = person.surname
        }
    }
```

### delete the record

Another simple and self-explanatory - delete with the `where` clause

```kotlin
override fun delete(id: PersonId): Unit = transaction {
        PersonTable.deleteWhere {
            PersonTable.id eq id
        }
    }
```

### add child relations records

because we use `DSL` (instead of `DAO`), we need to take care of inserting child rows by hand:

```kotlin
override fun addAddress(personId: PersonId, address: CreateAddressDto) {
        AddressTable.insert {
            it[AddressTable.personId] = personId
            it[street] = address.street
            it[city] = address.city
            it[house] = address.house
            it[postalCode] = address.postalCode
            it[apartment] = address.apartment
        }
    }
```

## Initial insert

Once we have *Table* and *Repository* ready, we can go with implementing further our `Data` class:

`Data.kt`

```kotlin
fun Application.configureData() {
    Database.register()
    val repository = PersonRepositoryImpl()
    transaction {
        SchemaUtils.create(PersonTable)
        SchemaUtils.create(AddressTable)
        val john = repository.create(CreatePersonDto("John", "Doe", 33))
        repository.addAddress(john, CreateAddressDto(
            "ul. Jana Matejki", "12", "1", "Gdansk", "80-232"
        ))
        repository.addAddress(john, CreateAddressDto(
            "ul. Jana Matejki", "13", "1", "Gdansk", "80-232"
        ))
        repository.create(CreatePersonDto("George", "Smith", 34))
        repository.create(CreatePersonDto("Megan", "Miller", 22))
    }
}
```

*What we did here?* In `transaction` block.

> Every database access using Exposed is started by obtaining a connection and creating a transaction.

We created the tables in the database (`SchemaUtils.create` call) and filled up the DB with initial records. For the first created `Person` record, we put two addresses with reference to `John.`

## REST endpoints

Right, we have the database filled up, we can use our DAO to create a REST endpoint:

`Routing.kt`

```kotlin
package pl.brightinventions.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import pl.brightinventions.persistance.PersonRepositoryImpl

fun Application.configureRouting() {
    val repository = PersonRepositoryImpl()

    routing {
        route("/person") {
            get {
                call.respond(repository.findAll())
            }
            get("/{id}") {
                val found = repository.find(call.parameters["id"]?.toInt()!!)
                found?.let { call.respond(it) } ?: call.respond(HttpStatusCode.NotFound)
            }
            post {
                call.respond(repository.create(call.receive()))
            }
            delete("/{id}") {
                call.respond(repository.delete(call.parameters["id"]?.toInt()!!))
            }
            put("/{id}") {
                call.respond(repository.update(call.parameters["id"]?.toInt()!!, call.receive()))
            }
        }
    }
}
```

*What we did here?* We (once again) created Ktor's plugin for registering the routing here. On the `/person` prefix, we register REST endpoints with a call to the `PersonRepository`.

but we need to register it in the application:

Application.kt

```kotlin
...
fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        install(ContentNegotiation) {
            json()
        }
        configureRouting()
        configureData()
    }
        .start(wait = true)
}
```

### Run it, baby!

`GET http://localhost:8080/person` \
should respond with a list of three persons: `John`, `George`, and `Megan`. Those will be represented by the *header* only (meaning, there will be no information about addresses yet).

So if we want to receive rich data about a particular person, we need  to call\
`GET http://localhost:8080/person/1`,\
which will respond with fat Person DTO.

## Conclusion

In this article, we've learned how to add JetBrains/Exposed to our project, and how to implement basic CRUD actions. In the next episode, I will show you, how to migrate from DSL to DAO approach - we will work with Entities, relations, and more! Stay tuned.

You can find the complete code [over GitHub.](https://github.com/bright/kotlin-exposed-example)

Read the next part of the series: [Exposed in Your Project - Part 2 - DAO](/blog/exposed-in-your-project-part-2-dao).

<div className="block-button"><h2>Work with us</h2><div>Join our bright team! Work with clients from industries such as FinTech, Blockchain, HealthTech, Retail, Logistics, and more.</div><a href="/career"><button>check our career opportunities</button></a></div>
