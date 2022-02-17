//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { redirect } = require("express/lib/response");
const date = require(__dirname + "/date.js");
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.locals._ = _;
mongoose.connect("mongodb+srv://admin-hypernik:<Password>t@cluster0.xxflq.mongodb.net/todolistDB", { useNewUrlParser: true });

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);

const defaultItems = [
  {name: "Welcome to your todolist!"},
  {name: "Hit the + button to add a new item."},
  {name: "<--Hit this to delete an item"}
];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  
  Item.find(function(err, result){
    if(result.length === 0){
      Item.insertMany(defaultItems, function (err) {
        if(err){
          console.log(err);
        }else{
          console.log("Default Items inserted");
        }
      });
      res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newListItems: result});
    }
  });
  
});

app.post("/", function(req, res){
  const listName = req.body.list;
  const item = new Item({name: req.body.newItem});
  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }else{
    console.log(listName);
    List.findOne({name: listName}, function(err, result){
      console.log(result);
      result.items.push(item);
      result.save();
      console.log("Save complete");
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const listName = req.body.listName;
  const itemId = req.body.checkbox;
  
  if(listName === "Today"){
    
    Item.findByIdAndRemove(itemId, function(err){
      if(err){
        console.log(err)
      }
    });
    res.redirect("/");
  }else{
    console.log(itemId);
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemId}}}, function(err, result){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }
})

app.get("/:customList", function(req, res){
  const customListName = _.capitalize(req.params.customList);
  
  List.findOne({name: customListName},function(err, result){
    if(!result){
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/"+customListName);
    }else{
      res.render("list", {listTitle: result.name, newListItems: result.items});
    }
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
