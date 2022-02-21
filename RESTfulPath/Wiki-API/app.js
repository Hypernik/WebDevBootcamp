const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
	title: String,
	content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(function(req, res){
	Article.find(function(err, results){
		if(!err){
			res.send(results);
		}else{
			res.send(err);
		}
	});
})
.post(function(req, res){
	const article = new Article({
		title: req.body.title,
		content: req.body.content
	});
	article.save(function(err){
		if(!err){
			res.send("Article added successfuly");
		}else{
			res.send(err);
		}
	});
})
.delete(function(req, res){
	Article.deleteMany(function(err){
		if(!err){
			res.send("Every document deleted");
		}else{
			res.send(err);
		}
	});
});

///////////////////////////////////// Specific Article targeting /////////////////////////

app.route("/articles/:articleTitle")
.get(function(req, res){
	Article.findOne({title: req.params.articleTitle}, function(err, result){
		if(!err){
			if(result){
				res.send(result);
			}else{
				res.send("No article matching article found")
			}
		}else{
			res.send(err);
		}
	});
})
.put(function(req,res){
	Article.replaceOne(
		{title: req.params.articleTitle}, 
		{
			title: req.body.title,
			content: req.body.content
		},
		function(err){
			if(!err){
				res.send("Update Successfull");
			}else{
				res.send(err);
			}
		});
})
.patch(function(req, res){
	Article.updateOne(
		{title: req.params.articleTitle},
		{$set: req.body},
		function(err){
			if(!err){
				res.send("Patch Succesfull")
			}else{
				res.send(err);
			}
		}
	)
})
.delete(function(req, res){
	Article.deleteOne(
		{title: req.params.articleTitle},
		function(err){
		if(!err){
			res.send("Delete Succesfull");
		}else{
			res.send(err);
		}
	});
})


app.listen(3000, function(){
	console.log("Server started on port 3000");
});