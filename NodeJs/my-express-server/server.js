const express = require("express");

const app = express();

app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>");
});

app.get("/contact", function (req, res) {
    res.send("Contact me at: hypernik47@gmail.com");
});

app.get("/login", function (req, res) {
    res.send("Enter Email ID: <input><br> Enter Password: <input>");
});

app.get("/about", function(req, res){
    res.send("Guess who's back, back again. <br> Shady's back, Tell a friend");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});