## BLOG API created using Typescript, NestJS and Auth0

This application allows users to create a blog post only if they have been authenticated and authorized. Otherwise, they will only be able to view the created posts by authenticated users. Authentication and authorization of users is handled by the implementation of AUTH0 middleware.

## Purpose

The purpose of this application was to adventure into a new language, Node.js framework and database. I've been really curious about creating an API using Typescript. While learning Typescript, I stumbled across a Node.js framework called Nest.js. I learned why it is so efficient, reliable and scalable. Nest.js is highly maintable and effectively addresses the architecure of application. Learning Nest with an understanding of Express made it alot easier to see the upside of using this framework. I decided to make a blog API to create the full CRUD capabilites of Nest.js. I persisted data by using MongoDB.

## What I learned

- How closely Typescript and Javascript are, the only exception is that Typescript forces you to declare types so that your code is a little more bug free. Typescript enables the developer to spot bugs while developing.

- How to install MongoDB on to my machine and how to run the database. I learned how to connect the Mongo database to root module of the Nest.js app. This allowed me to create the schema using mongoose to define the specific fields that would be stored in the database. What I really liked about Mongo is that it allows you to recieve and store data in JSON-like documents instead of having to visualize the database table in the form of rows and columns. It felt really productive and the learning curve did not seem to heavy.

- How to use Nest.js. One thing that stood out the most while implementing the backend with Nest was how clean everything is. I learned how to create a Data Transfer Object (DTO) that defines how the data from the backend will be sent to mongodb. The DTO I created was read-only to avoid any sort of mutation. I created the service module to hold all the logic for the application and communication to mongodb, then created the controllers which enabled all the HTTP requests. What was interesting was how nests forces the developer to program using OOP.

## Future Additions

- Frontend using React, Typescript and AUTH0 SPA to interact with this API

## Methods

### Request capabilities

| Method   | Description                                                                    |
| -------- | ------------------------------------------------------------------------------ |
| `GET`    | Used to retrieve a single blog post or a collection of all blog posts.         |
| `POST`   | Used when creating new blog post                                               |
| `PUT`    | Used to replace a whole blog post (all fields) with new or existing blog post. |
| `DELETE` | Used to delete an blog post.                                                   |

## Endpoints

| Endpoint                | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| `/blog/posts`           | fetch all posts from the database                                            |
| `/blog/post`            | create a new blog post (Authentication Required)                             |
| `/blog/edit/?postID=`   | edit an existing post by querying a specific ID (Authentication Required).   |
| `/blog/delete/?postID=` | delete an existing post by querying a specific ID (Authentication Required). |

## Request Body for new post
```
{
  "title": "String",
  "description": "String is updated",
  "body": "Hello this is edited",
  "author": "Miguel",
  "date_posted": "10-19-2022"
}

```
## Samples

`GET /blog/posts`

**Response:**
```
[
    {
        "_id": "63507233cf6c4eca9933bf06",
        "title": "String",
        "description": "String",
        "body": "String",
        "author": "String",
        "date_posted": "String",
        "__v": 0
    },
    {
        "_id": "63508b5800e69a1d5b750d4d",
        "title": "Blog 2",
        "description": "Here is Blog 2",
        "body": "Hello this is Blog 2",
        "author": "Me",
        "date_posted": "String",
        "__v": 0
    },
  
]

```

`POST /blog/post`

```
{
    "message": "Post has been submitted successfully",
    "post": {
        "title": "String",
        "description": "String",
        "body": "String",
        "author": "String",
        "date_posted": "String",
        "_id": "6351f02c515cc9d076e20e17",
        "__v": 0
    }
}
```


`PUT blog/edit?postID=`

```
{
   "message":"Post has been successfully edited",
   "post":{
      "\\_id":"6351f02c515cc9d076e20e17",
      "title":"String",
      "description":"String is updated",
      "body":"Hello this is edited",
      "author":"Miguel",
      "date_posted":"10-19-2022",
      "\\_\\_v":0
   }
```


`DELETE blog/delete?postID=`

```
{
   "message":"Post has been deleted!",
   "post":{
      "\\_id":"6351f02c515cc9d076e20e17",
      "title":"String",
      "description":"String is updated",
      "body":"Hello this is edited",
      "author":"Miguel",
      "date_posted":"10-19-2022",
      "\\_\\_v":0
   }
}

```


**No Auth Errors**
```
{
"message": "No authorization token was found"
}
```
OR

```
{
"message": "jwt expired"
}
```
