const mongoose = require("mongoose");

main().catch(err => console.log(err));
console.log("What is going on");
async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');
};
console.log('Connect');
const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true,'why no fucking name bitch!!']
	},
	rating: {
		type: Number,
		min: 1,
		max: 10
	},
	review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

var apple = new Fruit({
	name:"Apple",
	rating: 10,
	review: "Great stuff"
});

// apple.save();

var kiwi = new Fruit({
	name:"kiwi",
	rating: 10,
	review: "Noice"
});

var banana = new Fruit({
	name:"banana",
	// rating: 9,
	review: "Fantastic"
});
var lichee = new Fruit({
	name:"lichee",
	rating: 8,
	review: "Juicy"
});
var orange = new Fruit({
	name:"Orange",
	rating: 10
	// review: "Pulpy"
});
// Fruit.insertMany([kiwi, banana, lichee, apple, orange], function(err) {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log('sucess');
// 	}
// });

Fruit.find(function (err, fruits) {
	if(err){
		 console.log(err);
	}else{
		// mongoose.connection.close();
		fruits.forEach(function(fruit){
			console.log(fruit.name);
		});
	}
});

// Fruit.updateOne({_id: "620d2ccc88c2e4c79eeaede5"}, {rating: 8}, function (err) {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("Update Scuccesfull");
// 	}
// });

// Fruit.updateOne({_id: "620d2ccc88c2e4c79eeaede7"}, {review: "Pulpy MMMM!"}, function (err) {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("Update Scuccesfull");
// 	}
// });

Fruit.deleteOne({name: "lichee"}, function (err) {
	if(err){
		console.log(err);
	}else{
		console.log("Delete successfull");
	}
})

// mongoose.connection.close();

Fruit.deleteMany({name: "Apple"}, function(err){
	if (err) {
		console.log(err);
	} else {
		console.log("Delete successfull");
	}
})

const personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
	name: "Dragon fruit",
	rating: 7,
	review: "Fus roh dah"
});

pineapple.save();

const person = new Person({
	name: "Chrlotte",
	age: 32,
	favouriteFruit: pineapple
});

person.save();