---
author: patryk sz
tags:
  - Kotlin
  - Exposed
  - Ktor
  - Search
  - RSQL
  - FIQL
date: 2023-03-04T21:32:42.327Z
meaningfullyUpdatedAt: 2023-03-04T21:32:42.341Z
title: Exposed RSQL search implementation
layout: post
hidden: true
comments: true
published: true
---
Overview
---
In this tutorial, we are going to implement `search` functionality into the Exposed using jirutka's RSQL parser

RSQL is a query language for parametrized filtering of entries in RESTful APIs.\
JetBrains Exposed is a lightweight SQL library on top of the JDBC driver for Kotlin language.


Setting up a test application
---
**_NOTE_: You can skip this part and go directly to [RSQL search functionality implementation](#rsql-search-functionality-implementation) part if you have any web framework/exposed setup ready**

For the sake of the test, we use [Ktor](https://ktor.io/) - the easiest way to do so is to use [initializer](https://start.ktor.io/)

Once we go through the form, the application frame is ready to work with. Now, we need to add serialization functionality (because we want to return a JSON object as the response)

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

We _may_ need H2 database:

`build.gradle.ts`
```
dependencies {
    implementation("com.h2database:h2:$h2Version")
}
```

plus, we need jirutka/rsql-parser

`build.gradle.ts`
```
dependencies {
    implementation("cz.jirutka.rsql:rsql-parser:2.1.0")
}
```

Adding the Exposed
---

Now, we can add our persistence layer - Exposed ORM:

`build.gradle.ts`
```
dependencies {
    implementation("org.jetbrains.exposed:exposed-core:0.40.1")
    implementation("org.jetbrains.exposed:exposed-dao:0.40.1")
    implementation("org.jetbrains.exposed:exposed-jdbc:0.40.1")
}
```

In order to create a database connection and perform the initial db insert, I created Ktor's plugin:

`Data.kt`
```kotlin
import pl.brightinventions.dto.CreatePersonDto
import pl.brightinventions.exposed.Database
import pl.brightinventions.persistance.PersonDaoImpl
import pl.brightinventions.persistance.table.PersonTable
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.configureData() {
    Database.register()
    TODO("more logic incoming")
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

Persistence layer logic
---

Once we added Exposed into our environment, it's time to introduce the table's model and some DTOs.

In Exposed, the table's representation is an object:

`PersonTable.kt`
```kotlin
import org.jetbrains.exposed.sql.Table

object PersonTable : Table("person") {
    val id = uuid("id").autoGenerate()
    val name = text("name")
    val surname = text("surname")
    val age = integer("age")
}
```

Your object table needs to extend from the Exposed `Table`. The content of it is a group of defined columns

Let's create our DAOs:

`PersonDaoImpl.kt` (I skip the DAO interface part - you can check it on the Github repo page)
```kotlin
import pl.brightinventions.dto.CreatePersonDto
import pl.brightinventions.dto.FoundPersonDto
import pl.brightinventions.exposed.SearchPropertySpecification
import pl.brightinventions.exposed.SearchSpecification
import pl.brightinventions.exposed.search
import pl.brightinventions.persistance.table.PersonTable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

class PersonDaoImpl : PersonDao {

    override fun findAll(): List<FoundPersonDto> = transaction {
        PersonTable.selectAll().map(::mapToFoundPerson)
    }

    override fun findByQuery(query: String): List<FoundPersonDto> = transaction {
        TODO("will be implemented soon")
    }

    private fun mapToFoundPerson(it: ResultRow) = FoundPersonDto(
        it[PersonTable.id],
        it[PersonTable.name],
        it[PersonTable.surname],
        it[PersonTable.age]
    )

    override fun create(person: CreatePersonDto) {
        transaction {
            PersonTable.insert {
                it[name] = person.name
                it[surname] = person.surname
                it[age] = person.age
            }
        }
    }
}
```

As you can see, we defined three public methods:
- `findAll` - will return all the records from the db
- `findByQuery(String)` - will return a filtered set of the records
- `create` - our util function we will use for initial inserts

Initial insert
---

Once we have _Table_ and _Dao_ ready, we can go with implementing further our `Data` class:

`Data.kt`
```kotlin
fun Application.configureData() {
    Database.register()
    transaction {
        SchemaUtils.create(PersonTable)
        PersonDaoImpl().create(CreatePersonDto("John", "Doe", 33))
        PersonDaoImpl().create(CreatePersonDto("George", "Smith", 34))
        PersonDaoImpl().create(CreatePersonDto("Megan", "Miller", 22))
    }
}
```

*What we did here?* In `transaction` block..

> Every database access using Exposed is started by obtaining a connection and creating a transaction

..we created the table in the database (`SchemaUtils.create` call) and filled up the DB with initial records

REST endpoints
---
Right, we have the database filled up, we can use our DAO to create a REST endpoint:

`Routing.kt`
```kotlin
import pl.brightinventions.persistance.PersonDaoImpl
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    val dao = PersonDaoImpl()

    routing {
        get("/") {
            call.respond(dao.findAll())
        }
    }
}
```
*What we did here?* We (once again) created Ktor's plugin for registering the routing here. On the `/` endpoint we are going to respond with ALL of the objects in the `Person` table

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

Run it, baby! `GET http://localhost:8080/` should respond with a list of three persons: `John`, `George`, and `Megan`.\
alright, but when we will implement the searching functionality? Now

RSQL search functionality implementation
---

Finally! For now, we have the ktor+exposed stack set up, everything works fine and we can add and list the objects from the database. It's time to create the `search` method for the `Query` class:

```kotlin
import cz.jirutka.rsql.parser.RSQLParser
import cz.jirutka.rsql.parser.ast.Node
import org.jetbrains.exposed.sql.Query
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.transactions.transaction

fun Query.search(query: String, specification: SearchSpecification): Query =
    transaction {
        val rootNode: Node = RSQLParser().parse(query)
        val queryExpression = rootNode.accept(ExposedRSQLVisitor(specification))
        andWhere { queryExpression }
    }

```

*What we did here?* We declared the extension function `Query.search` which parse `query: String` into the tokens and calls our `ExposedRSQLVisitor` to interpret the query
it returns the `Query` object itself, so we will be able to perform as it would be standard Exposed functionality

What is the `ExposedRSQLVisitor`? It's our custom implementation - jirutka/rsql-parser is the "only" parser for a perform the logic in order to change "age=in=(33,22)" into the node tree. It is how it looks like this:

`ExposedRSQLVisitor.kt`
```kotlin
import cz.jirutka.rsql.parser.ast.*
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Op
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.greater
import org.jetbrains.exposed.sql.SqlExpressionBuilder.greaterEq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.inList
import org.jetbrains.exposed.sql.SqlExpressionBuilder.less
import org.jetbrains.exposed.sql.SqlExpressionBuilder.lessEq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.neq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.notInList
import java.time.Instant
import java.time.format.DateTimeParseException

class ExposedRSQLVisitor(
    private val searchSpecification: SearchSpecification
) : NoArgRSQLVisitorAdapter<Op<Boolean>>() {

    override fun visit(node: AndNode): Op<Boolean> {
        TODO("Not yet implemented")
    }

    override fun visit(node: OrNode): Op<Boolean> {
        TODO("Not yet implemented")
    }

    @Suppress("UNCHECKED_CAST")
    override fun visit(node: ComparisonNode): Op<Boolean> {
        val arguments =
            node.arguments.map {
                it.toLongOrNull()
                    ?: it.toBooleanStrictOrNull()
                    ?: it.toDateOrNull()
                    ?: it.toDoubleOrNull()
                    ?: it
            }
        val argument = arguments.first()

        val property = searchSpecification.properties.first { it.name == node.selector }
        val column = property.column as Column<Any>
        return when (val operator = node.operator) {
            RSQLOperators.EQUAL -> column eq argument
            RSQLOperators.NOT_EQUAL -> column neq argument
            RSQLOperators.GREATER_THAN -> column greater argument as Comparable<Any>
            RSQLOperators.GREATER_THAN_OR_EQUAL -> column greaterEq argument as Comparable<Any>
            RSQLOperators.LESS_THAN -> column less argument as Comparable<Any>
            RSQLOperators.LESS_THAN_OR_EQUAL -> column lessEq argument as Comparable<Any>
            RSQLOperators.IN -> column inList arguments
            RSQLOperators.NOT_IN -> column notInList arguments

            else -> throw Exception("Filter operator '$operator' not supported")
        }
    }
}

private fun String.toDateOrNull(): Instant? = try {
    Instant.parse(this)
} catch (e: DateTimeParseException) {
    null
}
```

*What we did here?* In essence, we implemented `NoArgRSQLVisitorAdapter` which is going to visit the node in order to determine what logic operation (exposed) should we perform to the given column/argument

So, if we will have a query string like `age=in=(33,22)`, our Visitor will produce
```
column<PersonTable.age> inList listOf(33,22) 
```

so our SQL query will be:
```SQL
SELECT PERSON.ID, PERSON."NAME", PERSON.SURNAME, PERSON.AGE FROM PERSON WHERE PERSON.AGE IN (33, 22)
```

It's time to use the `search` method in our DAO and call it in the controller:

`PersonDaoImpl.kt`
```kotlin
...
override fun findByQuery(query: String): List<FoundPersonDto> = transaction {
    PersonTable
        .selectAll()
        .search(query, SearchSpecification(listOf(
            SearchPropertySpecification("name", PersonTable.name),
            SearchPropertySpecification("age", PersonTable.age)
        ))).map(::mapToFoundPerson)
}
```

Please note the `SearchSpecifictation` structure - it's a way to tell the Visitor what kind of fields can be used in filtering and how they should be mapped to `PersonTable` columns

`SearchSpecification.kt`
```kotlin
data class SearchSpecification(
    val properties: List<SearchPropertySpecification>
)

data class SearchPropertySpecification(
    val name: String,
    val column: Column<*>
)
```

and a controllers' call:

`Routing.kt`
```kotlin
...
get("/filtered/") {
    call.respond(dao.findByQuery(call.request.queryParameters["query"] ?: ""))
}
```

`GET http://localhost:8080/filtered/?query=age=in=(33,22)` will return us two records - for `John Doe` and `Megan Miller`

Conclusion
---
In this article, we've learned how to add generic `search` functionality to our Exposed stack. Ktor added just a flavor of something other than Spring Boot - I did it on purpose - maybe you will find it interesting enough to dig deeper about this framework

You can find the complete code [over GitHub](https://github.com/bright/exposed-search-example)
