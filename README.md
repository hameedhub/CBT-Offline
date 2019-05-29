
# CBT Offline
> An offline computer based test

CBT Offline allows student to answer exam questions offline

## Installing / Getting started
Brief introduction on how to run the application. Clone the repo and RUN the following lines of code on your terminal directly on the folder.

```shell
npm install --To install all dependencies 
npm start   --To run the application
```


### Initial Configuration

Install Node JS which should come with a node package manager. It is the required environment for the application
Open the node command prompt or any of your favourite command tool and type ``` node --version``` to check if it installed
cd .. or change directory to the clone repo and type ``` npm install ```


## Developing

Procedure for further development of this application:

```shell
git clonehttps://github.com/hameedhub/CBT-Offline.git
cd CBT-Offline
npm install
```
All the required package to run and develop the application are to be installed in order to have smooth run.

### Built with

* Node Js Framework

### Building

In addition, this application is written in ES6 which have some atypical syntax. Hence, may not run on some platform. Babel node, babel cli, babel-register and babel-preset-env should be installed to build the application to ES5

```shell
.start: babel-node app.js
npm start
```

RUN npm start on the clone repo, then babel builds it into later version, which can run in most platforms.


## Configuration / API Endpoints

Here are the API endpoints, it only allows json format and the expected output are also in json format.

### Admin Start Application
#### POST /api/v1/start

Required fields :
username: `String`  
password: `'String`
date: `String`  

On success response
```shell
{
    “status” : Integer ,
    “message” : String ,
    “path” : String 
    }
} 
```
Error response
```shell
{
    “status” : 500 ,
    “error” : “relevant-error-message”
} 
```
Entry
```shell
[]
    {
    “username” : String ,
    “password” : String ,
    }
] 
```

### Post Question
#### POST /api/v1/question

Required fields :
subject: `String`  
class: `'String`
date: `String`
questions: `Array { Objects }`

On success response
```shell
{
    “status” : Integer ,
    “message” : String ,
    “path” : String ,
  }
}
```
Error response
```shell
{
    “status” : 404, 500 ,
    “error” : “relevant-error-message”
} 
```


### View Questions
#### POST /api/v1/question/view

Required fields :
subject: `String`  
class: `'String`
term: `'String`
date: `'String`

On success response
```shell
{
  “status” : Integer ,
  “question” :[{
  “num” : Number ,
  “question” : Array { Object }
  “option” : Array , 
  “answer” : String 
  }
 ]
}
```
Error response
```shell
{
    “status” : 500, 410, 404 ,
    “error” : “relevant-error-message”
} 
```

### Student Session Login
#### POST /api/v1/session/:date

Required fields :
studentId: `String` 
name: `String`  
subject: `String`  
class: `String`  
term: `String`  

On success response
```shell
{
  {
  “status” : Integer ,
  “token” : String ,
  “message” : String 
}
```
Error response
```shell
{
    “status” : 500, 404 ,
    “error” : “relevant-error-message”
} 
```

### Student Answer Question
#### POST /api/v1/session/:date/question/:num

Required fields :
Authorization [Header]: `String`  { token }
studentAnswer: `String`  

On success response
```shell
{
  
  “status” : Integer ,
  “answer” : {
      “num”: Integer,
      “question”: String,
      “option”: [ ],
      “answer”: String
  },
  “userData”:{
    “student” :{
    “studentId” : Number ,
    “name” : String,
    “subject” : String,
    “class” : String,
    “term” : String,
    “date” : String
  },
  “questionPath” : String,
  “login” : String,
  “iat” : Integer
  
}
```
Error response
```shell
{
    “status” : 500, 404 ,
    “error” : “relevant-error-message”
} 
```

### Get question by ID
#### POST /api/v1/session/:date/:num
  
 Required fields :
 Authorization: `String`  { token }

On success response
```shell
{
  
  “status” : Integer ,
  “answer” : {
      “num”: Integer,
      “question”: String,
      “option”: [ ],
      “answer”: String
  },
  “userData”:{
    “student” :{
    “studentId” : Number ,
    “name” : String,
    “subject” : String,
    “class” : String,
    “term” : String,
    “date” : String
  },
  “questionPath” : String,
  “login” : String,
  “iat” : Integer
  
}
```
Error response
```shell
{
    “status” : 500, 404 ,
    “error” : “relevant-error-message”
} 
```

## Contributing

If you'd like to contribute, please fork the repository and make a feature
branch. I accept all forms of feedback. Thanks!
