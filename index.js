var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
app.use(express.json());
var database;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Student');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Define Schema and Model for 'users' collection
var userSchema = new mongoose.Schema({
    name: String,
    sid: String,
    int1: String,
    int2: String,
    int3: String
});
var User = mongoose.model('User', userSchema);
// POST endpoint for user sign up
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var sid = req.body.sid;
    var int1 = req.body.int1;
    var int2 = req.body.int2;
    var int3 = req.body.int3;

    var newUser = new User({
        name: name,
        sid: sid,
        int1: int1,
        int2: int2,
        int3: int3
    });

    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving user.");
        }
        console.log("Record Inserted Successfully");
        
    });
});

// GET endpoint to retrieve all users
app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving users.");
        }
        res.send(users);
    });
});
// Start the server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
