const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require("path");
const ejs = require('ejs');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.engine('ejs', ejsMate);

// Middlewares
app.use(methodOverride("_method")); // To send PUT or DELETE request
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // To connect ejs with css
app.use(express.urlencoded({ extended: true }));

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
    res.render("listings/index", { allListings });
});

// New Route
// GET /listings/new --> We get a Form
// POST /listings --> Submit
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});


// Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect("/listings");
});

// DELETE LISTING
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});