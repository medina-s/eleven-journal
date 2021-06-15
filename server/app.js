require("dotenv").config(); //importing the package and make items in .env available to out whole app
const Express = require("express"); //we require the use of Express npm package
const app = Express(); //firing off the top level of Express() function, a function exported by the Express module. This allows us to create an Express app
const dbConnection = require("./db");

app.use(require('./middleware/headers'));//we activate headers in the app.js

const controllers = require("./controllers"); //we import the controllers as a bundle through the object that we just exported in the index.js and store it
// in a var called controllers

app.use(Express.json()); //adding a middleware function, it tells the application that we want
//  json to be used as we process this request.

app.use("/journal", controllers.journalController); // we call app use and in the first parameter create a base URL called Journal
app.use("/user", controllers.userController);

dbConnection.authenticate()
    .then(()=> dbConnection.sync())
    .then(()=> {
        app.listen(3000, ()=> {   //will use express to start a UNIX socket and listen for connections on the given path.THe given path is localhost:3000, indicated by parameter of 3000
            console.log(`[Server]: App is listening on 3000`); //calling anonymous callback function when the connection happens
        });
    })
    .catch((err)=> {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });

// app.listen(3000, ()=> {
//     console.log(`[Server]: App is listening on 3000.`)
// });