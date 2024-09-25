const mongoose = require("mongoose")

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {useNewUrlParser: true});


const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Peaches",
  rating: 10,
  review: "Nice"
});

//fruit.save();

const personSchema = new mongoose.Schema ({
  Name: String,
  Age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const grape = new Fruit({
  name: "Grape",
  score: 10,
  review: "Best fruit EVER!!!!."
});

grape.save();

const person = new Person (
{
  Name: "John",
  Age: 16,
  favoriteFruit: grape
});

person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "great fruit"
});

const orange = new Fruit({
  name: "Orange",
  score: 8,
  review: "S tier fruit"
})

const banana = new Fruit({
  name: "Banana",
  score: 1,
  review: "Makes my stomach hurt sometimes"
});

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   }else {
//     console.log("Succesfully saved all the fruits to fruitsDB");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name)
    });
  }
});

Fruit.updateOne({_id:"63ccb981395fede724f654fa"}, {name: "Coconut"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated the document.");
  }
});

Fruit.deleteMany({name: "Apple"}, function(err){
  if (err) {
    consoloe.log(err);
  } else {
    console.log("Successfully deleted the document(s)");
  }
})







const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
     name: "Apple",
     score: 8,
     review: "Great fruit"
   },
    {
     name:"Orange",
     score: 6,
     review: "kinda sour"
   },
    {
     name:"Banana",
     score: 9,
     review: "Great stuff"
   }
 ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.insertedCount);
    assert.equal(3, Object.keys(result.insertedIds).length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
}
