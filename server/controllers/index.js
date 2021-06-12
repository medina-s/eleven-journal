module.exports = {   //we exporing this file as a module, exporting everything as an object
    userController: require('./userController'),
    journalController: require('./journalController'), //we define a property called journalController, the value of the property is the import of the JCOntroller file

};