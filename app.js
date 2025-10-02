const express = require('express')
const app = express()
const port = 8080 
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require("path");
const ejs = require('ejs');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

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


// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings});
});

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save(); 
    console.log(newListing);
    res.redirect("/listings");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing});
});
