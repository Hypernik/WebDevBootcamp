const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = ["Attend Meeting", "Complete Meeting", "Smoke a fag"];


app.get("/", function(req, res){
    res.render("list", {listTitle: date.getDate(), listItems: items});
});

app.post("/", function(req, res){
    console.log(req.body)
    if(req.body.list == "Work List"){
        workItems.push(req.body.task);
        res.redirect("/work");
    }else{
        items.push(req.body.task);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list",{listTitle: "Work List", listItems: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3000, function(){
    console.log("Server started at port 3000");
});