const Express = require("express"); //import the Express framework and store it inside of var
const router = Express.Router(); //create new var, since the Express var gives us access in the express framework, we can access express properties 
// and methods by calling express.method name(),therefore when we call express.router we are using express var to access the router() method
const validateJWT = require ("../middleware/validate-jwt");

router.get('/practice', validateJWT, (req, res)=>{
    res.send('Hey!! This is the about route!') //path and anonymous call back function also called "handler function". Here the res parameter is a simple string
});

module.exports = router;//we export the module for usage outside of the file