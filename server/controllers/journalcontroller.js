let Express = require("express"); //import the Express framework and store it inside of var
let router = Express.Router(); //create new var, since the Express var gives us access in the express framework, we can access express properties 
// and methods by calling express.method name(),therefore when we call express.router we are using express var to access the router() method
let validateJWT = require ("../middleware/validate-jwt");

// Import the journal model
const {JournalModel} = require("../models");

router.get('/practice', validateJWT, (req, res)=>{
    res.send('Hey!! This is the practice route!') //path and anonymous call back function also called "handler function". Here the res parameter is a simple string
});

/*
==============================
JOURNAL CREATE
==============================
*/

router.post("/create", validateJWT, async (req, res) => {
    const {title, date, entry} = req.body.journal;
    const {id} = req.user;
    const journalEntry = {
        title,
        date,
        entry,
        owner: id
    }
    try {
        const newJournal = await JournalModel.create(journalEntry);
        res.status(200).json(newJournal);
    } catch (err) {
        res.status(500).json ({error: err});
    }
});

router.get("/about", (req, res) => {
    res.send ("this is the about route!")
});

module.exports = router;//we export the module for usage outside of the file

/*
==============================
Get all journals
==============================
*/
router.get("/",async (req, res) => {   //setting up a get request with a sub route of "/"
    try {
        const entries = await JournalModel.findAll(); //looking at the journal table and and using 
        // sequelize method findALL to find all of the items. It returns us a promise which we can 
        // await the response of.
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({error: err });
    }
});

/*
==============================
Get entries by User
==============================
*/

router.get("/mine", validateJWT, async (req, res) => {  //by adding validateJWT middleware function
    // we restricting this route for specific users only
    const {id} = req.user; //pulling the id value off the user that sent the request, and assign it to the constant
    try{
        const userJournals = await JournalModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userJournals);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

/*
==============================
Get entries by Title
==============================
*/
router.get ("/:title", async (req, res) => {  //dynamic route
    const {title} = req.params;
    try {
        const results = await JournalModel.findAll({
            where: {title: title}
        });
        res.status(200).json(results);
    } catch (err){
        res.status(500).json ({error: err})
    }
});

/*
==============================
Update a journal
==============================
*/

router.put("/update/:entryId", validateJWT, async (req, res) => { //put = update
    const {title, date, entry} = req.body.journal;
    const journalId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: journalId,
            owner: userId
        }
    };

    const updatedJournal = {
        title: title,
        date: date,
        entry: entry
    };

    try {
        const update = await JournalModel.update(updatedJournal. query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

/*
==============================
Delete a journal
==============================
*/

router.delete("/delete/:id", validateJWT, async (req, res) =>{  //id allows a url parameter to be passed
    // through URL to the server so we can specify what journal we want to delete 
    const ownerId = req.user.id;
    const journalId = req.params.id;

    try {
        const query = {
            where: {
                id: journalId,
                owner: ownerId
            }
        };
        await JournalModel.destroy(query); //destroy is the sequelize method to remove an item from a DB
        res.status(200).json({message:"Journal Entry Removed"});
    }catch (err) {
        res.status(500).json({error: err});
    }
});