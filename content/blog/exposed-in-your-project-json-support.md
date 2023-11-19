---
author: patryk sz
tags:
  - Exposed
  - kotlin
  - jvm
  - orm
  - database
  - json
  - jackson
  - docker
date: 2023-04-04T11:51:42.403Z
meaningfullyUpdatedAt: 2023-04-04T11:51:42.417Z
title: Exposed in Your Project - JSON support
layout: post
image: /images/exposed_blog.png
hidden: false
comments: true
published: true
language: en
---
## Overview

In this tutorial, we are going to learn how to implement JSON support in our JetBrains/Exposed app - we will create new
ColumnType and how to modify the database query.

As an extra point, I will show you, how to establish connection pooling and why it's important.

[In the previous post](https://brightinventions.pl/blog/exposed-in-your-project-part-2-dao/) we modified our initial
code to follow DAO approach. Now, based on this, we will create a little thinner application, add additional information
to our `Person` entity and use `json` PostgreSQL' datatype.

## Setting up a test application

***NOTE*: Because we did all the preparation in the previous blog post, we will skip this part - if you need to set up
the environment, please, go to Step 1**

## Setting up a database

For the sake of this tutorial, we are going to use PostgreSQL database. Let's create a docker container:

```yaml
# docker-compose.yml
version: '3.3'
services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: foo
    ports:
      - "55432:5432"
```

We are just using the official `postgres` image, with a defined password and exposed port.

### connection pooling

```kotlin
// Database.kt
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.config.*
import org.jetbrains.exposed.sql.Database

object Database {

    fun register(config: ApplicationConfig) {
        Database.connect(
            hikari(
                config.property("db.url").getString(),
                config.property("db.user").getString(),
                config.property("db.password").getString(),
                config.property("db.maximumPoolSize").getString().toInt()
            )
        )
    }

    private fun hikari(dbUrl: String, dbUser: String, dbPassword: String, maximumPoolSize: Int): HikariDataSource {
        val config = HikariConfig()
        config.driverClassName = "org.postgresql.Driver"
        config.jdbcUrl = dbUrl
        config.username = dbUser
        config.password = dbPassword
        config.maximumPoolSize = maximumPoolSize
        config.validate()
        return HikariDataSource(config)
    }
}
```

Plus, the configuration file:

```
# src/main/resources/application.conf
db {
    url = "jdbc:postgresql://localhost:55432/postgres"
    user = postgres
    password = foo
    maximumPoolSize = 10
}
...
```

Now, why connection pooling is important?

> Using connection pools helps to both alleviate connection management overhead and decrease development tasks for data
> access. Each time an application attempts to access a backend store (such as a database), it requires resources to
> create, maintain, and release a connection to that data store.
>
> With PostgreSQL, each new connection can take up to
> 1.3MB in memory. In a production environment where we expect to receive thousands or millions of concurrent
> connections
> to the backend service, this can quickly exceed your memory resources (or if you have a scalable cloud, it can get
> very
> expensive very quickly).

## Add JsonColumnType

First, let's create and register a new column type - `JsonColumnType`:

```kotlin
// JsonColumnType.kt
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ColumnType
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.statements.api.PreparedStatementApi
import org.postgresql.util.PGobject

fun <T : Any> Table.json(name: String, serialize: (Any) -> String, deserialize: (String) -> Any): Column<T> =
    registerColumn(name, JsonColumnType(serialize, deserialize))

class JsonColumnType(
    private val serialize: (Any) -> String,
    private val deserialize: (String) -> Any
) : ColumnType() {
    override fun sqlType() = "JSON"

    override fun setParameter(stmt: PreparedStatementApi, index: Int, value: Any?) {
        super.setParameter(
            stmt,
            index,
            value.let {
                PGobject().apply {
                    this.type = sqlType()
                    this.value = value as String?
                }
            }
        )
    }

    override fun valueFromDB(value: Any): Any {
        if (value !is PGobject) {
            return value
        }
        return deserialize(checkNotNull(value.value))
    }

    override fun notNullValueToDB(value: Any): String = serialize(value)
}
```

The result of this implementation is that we have an available `.json()` method on `Table` level - which means that we can
use our new columnType:

```kotlin
// PersonTable.kt

import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.dao.id.IntIdTable
import pl.brightinventions.exposed.json

object PersonTable : IntIdTable("person") {
    ...
    val details = json<PersonDetails>(
        "details",
        { Json.encodeToString(it as PersonDetails) },
        { Json.decodeFromString(it) as PersonDetails }
    )
}

@Serializable
data class PersonDetails(
    val nickname: String
)
```

Because of our choice of `kotlinx` serialization, we need to declare the context for serialization explicitly (casting for
methods `Json.encodeToString` and `Json.decodeFromString`) - the easiest way was to declare it on the column registering
step.

## Add JsonValue

Once we registered our new column, we can store serialized and read the object value. But what if we want to use our
column in `WHERE` or `ORDER BY` clause?\
We need to register `JsonValue` and a new method:

```kotlin
// JsonValue.kt
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.Function
import org.jetbrains.exposed.sql.vendors.PostgreSQLDialect
import org.jetbrains.exposed.sql.vendors.currentDialect
import kotlin.reflect.KClass

inline fun <reified T : Any> Column<*>.jsonValue(vararg jsonPath: String): Function<T> =
    this.jsonValue(T::class, *jsonPath)

fun <T : Any> Column<*>.jsonValue(clazz: KClass<T>, vararg jsonPath: String): Function<T> {
    if (this.columnType !is JsonColumnType) {
        throw IllegalArgumentException("Cannot perform jsonValue call on the column which is not related to JsonbColumnType")
    }

    val columnType = when (clazz) {
        Boolean::class -> BooleanColumnType()
        Int::class -> IntegerColumnType()
        Float::class -> FloatColumnType()
        Long::class -> LongColumnType()
        String::class -> TextColumnType()
        else -> TextColumnType()
    }

    return when (currentDialect) {
        is PostgreSQLDialect -> PostgreSQLJsonValue(this, columnType, jsonPath.toList())
        else -> throw NotImplementedError()
    }
}

class PostgreSQLJsonValue<T>(
    private val expr: Expression<*>,
    override val columnType: ColumnType,
    private val jsonPath: List<String>
) : Function<T>(columnType) {
    override fun toQueryBuilder(queryBuilder: QueryBuilder) = queryBuilder {
        append("(")
        append(expr)
        append("${jsonPath.joinToString { it }})::${columnType.sqlType()}")
    }
}
```

We created `PostgreSQLJsonValue` which is a representation of `(column->>jsonPath)::type` PostgreSQL' syntax. Plus, we can
use `jsonValue` method in order to utilize JSON functionality inside the query, which will look like this:

```kotlin
fun findByNickname(nickname: String): FoundPersonWithAddressDto? = transaction {
    PersonEntity
        .find { PersonTable.details.jsonValue<String>("->>'nickname'") eq nickname }
        .firstOrNull()
        ?.load(PersonEntity::addresses)?.toFoundPersonWithAddressDto()
}
```

## Testing

`GET http://localhost:8080/person` \
This one should respond with a list of three persons: `John`, `George`, and `Megan`. It will respond with short
information about saved records, but the rows will be ordered by `person.details->>'nickname'`.

If we want to receive data about a particular person BY nickname, you can call:
`GET http://localhost:8080/person/nickname/johny`,\
which will respond with full Person DTO.

## Conclusion

In this article, we've learned:

* how to add `json` column type to our JetBrains/Exposed application,
* how to add `jsonValue` method which allows us to search/sort by the JSON specific property in the query.

As extra points we did:

* exercise to create Docker container for our PostgreSQL database,
* configured connection pooling, which is important to our production environment.

**Did you like the article? Maybe you have some other way for DAO implementation? Leave a comment below and stay in
touch!**

You can find the complete code [over GitHub.](https://github.com/bright/kotlin-exposed-json-example)

<div className="block-button"><h2>Are you backend dev? Join us!</h2><div>We are looking for an experienced Backend Developer who understands Java/Kotlin & Spring really well and who would like to work with AWS on a daily basis.</div><a href="/jobs/senior-backend-developer/"><button>apply now</button></a></div>
