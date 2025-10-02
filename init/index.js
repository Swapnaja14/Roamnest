const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const initData = require("./data");
const Listing = require('../models/listing');

const MONGO_URL = "mongodb://127.0.0.1:27017/roamnest";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log(err);
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.get('/testListing', async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the shiny blue sea",
        // image: "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg",
        price: 1200,
        location: "Calangute, Goa",
        country: "India"
    });


    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing")
});

const initDB = async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();