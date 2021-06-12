const { DataTypes} = require("sequelize"); //object destructuring is used to extrapolate the DataTypes 
// object from the Sequelize dependancy
const db = require("../db");//we import the connection to our database that we set up in the db.js. 
// This will unlock methods from the sequelize connection that we can call upon
const User = db.define ("user", {  //this is where definition and creation of the model takes place.
    //  We call the define method. This is a sequelize method that will map model properties in 
    // the server file to a table in the Postgres.
    email: {
        type: DataTypes.STRING(100),//any key values of this object will become columns of the table.
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;