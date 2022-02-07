const express = require("express");

const bodyParser = require("body-parser");

app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    console.log("get request for calculator")
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var result = Number(req.body.num1) + Number(req.body.num2);
    res.send("Thanks for choosing us!<br>The result is " + result);
});

app.get("/bmicalculator", function(req, res) {
    console.log("get request for bmi calculator")
    res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function(req, res){
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);
    var bmi = weight/Math.pow(height, 2);
    res.send("Your bmi is " + bmi);
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});