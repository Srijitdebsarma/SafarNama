//this is the database models

const mongoose= require("mongoose");

const Schema= mongoose.Schema;
const Review=require("./review.js");
const { listingSchema } = require("../schema.js");
const { required } = require("joi");


const ListingSchema= new Schema({
    title: {
        type: String,
    },
    description : String,
    travel:String,
    speciality:String,
    food:String,
    image : {
        url : String,
        filename: String,
    },
    expense :  Number,
    location : String,
    country : String,
    reviews:[
        {
            type :Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    //this will 1 to Many from reviews
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    //only a registered user can create a listing

    //location cordinates
    geometry:{  //geoJson format
        type:{
            type: String,
            enum:['Point'],
            required: true,
        },
        coordinates:{
            type:[Number],
            required:true,
        }
    },
    category:String,
})

//moongose middleware post => 
//jai kono listing delete hba akn theke tar review gulo k call mere



//segulo kao delete kore dbo
ListingSchema.post("findOneAndDelete", async(Listing)=>{
    if(Listing){
        await Review.deleteMany({_id: {$in: listingSchema.reviews}});
    }

})

const Listing = mongoose.model("Listing", ListingSchema);  //listingSchema r upor base kore akta listing collection banabe

module.exports = Listing;    