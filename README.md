# CRUD-App
A basic crud app using MERN stack

## Video 01: Backend
- create a backend and frontend folder
- setup backend with package: express, mongoose, nodemon dotenv
- server.js to setup main server
- setup .env file
- setup mongoDB atlas for a cluster
- mongoose for connecting in connectDB.js
- models.js -> create a schema for note having title and body
- add a route to /note to post the notes
- In this route we want to get the data from request, create a note with it and respond with a new note
- Test using postman
- /getnotes to show all the notes
- get for a route /notes/:id to search by the id
- a route for updating the notes
- route to delete 

## Video 2: Frontend
- setup a react app to your frontend
- setup tailwind css 
- use axios to fetch data
- functions:
    - to fetch notes
    - create note using a form
    - to update the notes
    - to delete notes

## Video 3: Authentication
- Create a user model
- Create a user Controller
    - create function login,signup,logout
- Add the routes post for login,signup and get for logout
- In signup function
    - get the email and password
    - create the record
    - send a response

- In signup function
    - get the email and password
    - create the record
    - send a response
    - test in postman

- Install the bcryptjs and store the hashed password

- In login function
    - get the email and password from req
    - find the record
    - compare the passwords
    - create a jwt
    - send response

- Create a middleware with a function requireAuth
