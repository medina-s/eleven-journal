const jwt = require ("jsonwebtoken");
const { UserModel} = require ("../models");

const validateJWT = async (req, res, next) => {
    if (req.method == "OPTIONS") {
        next();
    } else if (
        req.headers.authorization &&  //checks if we have a token on our headers object AND if it includes
        // the word "bearer"
        req.headers.authorization.includes("Bearer")
    ) {
        const {authorization} = req.headers;
        // console.log("authorization -->", authorization); //the token print out in the terminal 
        const payload = authorization
        ? jwt.verify(
            authorization.includes("Bearer")
            ? authorization.split(" ")[1]
            : authorization,
            process.env.JWT_SECRET
        )
        : undefined;

        // console.log ("payload -->", payload); //we can see how jwt decrypts the token and now we have access to the
        // user id. Payload is an object, means we can use the dot notation

        if(payload) {
            let foundUser = await UserModel.findOne({ where: {id: payload.id} });
            // console.log("foundUser -->", foundUser);

            if (foundUser) {
                // console.log("request -->", req);
                req.user = foundUser;
                next();
            } else {
                res.status(400).send ({message: "Not Authorized"});
            }
            } else {
                res.status(401).send({message: "Invalid token"});
            }
            } else {
                res.status(403).send({message: "Forbidden"});
            }
    };

module.exports = validateJWT;