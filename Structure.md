- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- listen to port 7777
- Write request handlers for some routes
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ , ~)

- initialize git
- .gitognore
- create a remote repo on gitHub
- Push all code to remote origin
- Play with routes and route-extensions
- Order of the route matter
- Make a workshop on postman and test Api call
- write logic to handle GET, POST, PATCH, DELETE API calls and test them on postman
- Explore the routing and use of ?, *, +, () in the routes
- Reading the query params in routes
- Reading the dynamic routes

- Multiple Route  - Play with it
- next()
- next function and errors along with res.send()
- app.use("/route, rH, [rH2, rH3], rH4, rH5)
- what is middleware
- How express JS handles requests behind the scenes
- Difference between app.use and app.all
- app.use doesnot match the exact route, for example "/" will give results for "/user", "/donar", etc (of GET, POST, PATCH, etc)
- app.all match and give results for exact route, for example "/manya" will only give results for "/manya" (of GET, POST, PATCH, etc)
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user admin
- write a dummy auth middleware for all user routes, exccept /user/login
- error handling using app.use("/", (err, req, res, next) => {});

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongodb library
- Connect your application to the database "Connection-url"/devTinder
- Call the connectDB function and connect to database before staring application on 7777
- Create a userSchema & userModel
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try, catch

- Difference between JS object and JSON 
- Add the express.json middleware to your app
- Make your signup API dynamic to recieve data from the end user
- API - get user by email
- feed API - GET /feed - get all the users from the database
- we are finding _id either from req.body.userId or req.body._id
- difference between patch and put
- API - update a user
- Explore the Mongoose Documentation for Model method
- what are the "options" in a model.findOneAndUpdate method, explore more about it
- API - update the user with emailId

- Explore schematype options from the documentation
- add required, unique, lowercase, min, minLength, trim
- add default 
- create a costum validate function for gender
- Improve the DB schema - PUT all appropiate validaton on each field in schema
- Add timestamps to the userScehma
- Add API level validation on Patch request & Signup post api
- DATA Sanitization - Add API validation for each field
- Install validators
- Explore validator library function ans use it for password, email, photoUrl
- NEVER TRUST req.body

- validate data in SignUp API
- Install bcrpytpackage
- Create PasswordHash using bcrypt.hash & save the user is excrypted password
- create login API
- Compare passwords and throw errors if email or password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- In Login API, after email and password validation, create a JWT token and send it to user in cookie
- read the cookies inside your profile API and find the logged in user
- userAuth middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- create userSchema method to comaprePassword(passwordInputByUser)

- Explore tinder API
- Create a list of all APIs you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation of express.Router
- Create routes folder for managing auth, profile, request routers
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => fprget password API
- Make you validate all data in every POST, PATCH api's

- create connection request schema 
- send connection request API
- Proper validation of data
- Think about all corner cases (for security)
- $or query $and query in mongoose
- schema.pre (middleware)
- Read more about index in DB
- What is the advantages and disadvantages of creating index
- Read this article about compound indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES

- Write code with validations for POST/request/review/:status/:requestId
- Though process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET/user/requests/recieved with all the checks

- Logic of GET/feed API
- Explore the $nin, $and, $ne and other query operators

- functions in moongodb
.skip() & .limit()
/feed?page=1&limit=10 => 1-10 .skip(0).limit(10)
/feed?page=2&limit=10 => 11-20 .skip(10).limit(10)
/feed?page=3&limit=10 => 21-30 .skip(20).limit(10)

jab /feed/:status -> tab vo get status using req.params
jab /feed/status -> tab vo get status using req.params

