const mongoose = require('mongoose');
const {Schema} = mongoose;

const listingSchema = new Schema ({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    image: {   
        filename: {
            type: String,
            default: "default_image",
        },
        url: {
            type: String,
            default: "https://images.pexels.com/photos/10396212/pexels-photo-10396212.jpeg"
        }
    },

    price: {
        type: Number,
        required: true
    },

    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;