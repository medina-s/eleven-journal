const { UniqueConstraintError} = require("sequelize/lib/errors");
const router = require("express").Router(); //combined two lines of code: import the express framework and access the Router() method, assigning it to the
// const { UniqueConstraintError } = require("sequelize/types");
// var Router. And it is const as we dont want to be able to change the value of this variable.

const { UserModel} = require("../models"); //we use object destructuring to import the user model and store it in User Model variable. It is convention
// to use Pascal casing (uppercase in both words) for a model class with sequelize.

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {  //we use the router object by using the router var to get an access into the Router()object methods
    // post() is one of the methods in the object, and we call it here, to complete an HTTP post request. We pass two arguments in post method
    // the first argument "/register" is the path. The second argument is an async callback function. The app listens for requests that match the specified
    // route and method, and when it detects the match, it calls the specified callback function. We wrote the syntax for this callback function to be an
    // anonymous fat-arrow function that takes in both the request and response parameters.

    let { email, password } = req.body.user;//we using object construction to take in and parse request.

    try {  // to wrap our code that allows a section of code to be attempted.

    const User = await UserModel.create({  // access to UserModel model properties and to sequelize model. Create" is the sequelize method to create an instance od the User model
        // and send it off to the DB, as long as it matches with data model.
        // adding await to capture the Promise when it is successful
        // adding the const User to be able to readily call the data for use and display
        email, //we send the data here we want our user to consist of
        password: bcrypt.hashSync(password, 13),
});

    let token = jwt.sign ({ id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 *24}); //create var, 
    // then we call upon our jwt variable, which is referring to the jsonwebtoken dependency we installed
    // earlier. This dependency comes with a couple methods. Sign() is the method we use to create 
    // the token. It takes at least two parameters: payload and signature. In addition we can also 
    // supply some specific options or a callback. in our case we are adding the time expiration.

    res.status(201).json({ // status allows us to add a status code to a response. Useful for error handling in the future.
        message: "User succesfully registered", //on top of 201 status code, it is good to add the message
        // json - will convert non objects (null and undefined) into valid json while res.send() cannot.
        user: User, //user is the key and User is the value
        sessionToken: token
    })
    } catch (err){
    if (err instanceof UniqueConstraintError) {
        res.status(409).json ({
            message: "Email already in use",
        });
    } else {
        res.status(500).json({  
            message: "Failed to register the user", //this will make it clear to the client that something failed.    
        });
    }
}
});

// LOGIN USER

router.post ("/login", async (req, res) => {
    let { email, password } = req.body.user;

    try {
        const loginUser = await UserModel.findOne({ //after waiting for data to come back, we store the
            // the retrieved data in a var called loginUser
            where: { // sequelize method that look for something matching it properties
                email: email,
            },
        });

        
        if(loginUser) { //we create conditional to check if our response has a true or false value

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if(passwordComparison){
                let token = jwt.sign({ id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 *24});
    
                res.status(200).json ({  //if we do have the user in out DB matching out criteria, we capture
                    // our response, set a status code of 200 and add an object containing a message.
                    user: loginUser,
                    message: "User successfuly logged in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: " Incorrect email or password"
                })
            }

        } else {  //we set else statement to catch the untrue values
            res.status(401).json({  //we capture our response, set a status code of 401 and add an object message
                message: "Incorrect email or password"
            });
        }

    } catch (error) {
        res.status(500).json ({
            message: "Failed to log the user in"
        })
    }
});



module.exports = router;