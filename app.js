const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://0.0.0.0:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true})

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required : [true, "Please check your data entry"]
  },
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as fruit"
})

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit ({
  name: "Mango",
  score: 6,
  review: "Decent fruit!"
})

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err){
  if (err) {
    console.log(err)
  } else {
    console.log("Successfully updated the document")
  };
});

//const person = new Person ({
//  name: "Amy",
//  age: 12,
//  favouriteFruit: pineapple
//})

mango.save()

//person.save()

Fruit.find(function (err, fruits){
  if (err) {
    console.log(err);
  } else {
    console.log(fruits);

    mongoose.connection.close()

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    })
  }
  
})

//Fruit.updateOne({id: "63f6c9cc55af992c82bf94da"}, 
//  {name: "Peach",},
//  function(err){
//    if (err) {
//      console.log(err)
//    } else {
//      console.log("Sucessfully updated")
//    }
//  }
//)

//Fruit.deleteOne({name: "Peach"}, function(err){
//  if (err) {
//    console.log(err);
//  } else {
//    console.log("Successfully deleted the database")
//  }
//})

Person.deleteMany({name: "John"}, function(err){
  if (err) {
    console.log(err)
  } else {
    console.log("Successfully deleted all the document")
  }
})