const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require("joi");

const ListingSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        description: String,


image: {
    filename: {
        type: String,
        default: "listingimage",
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
        set: (v) => (v === "" ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60" : v),
    },
},

        price: Number,
        location: String,
        country: String,
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],    
        owner: {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
        geometry:{
            type : {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            }
        }
});

ListingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
            await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;