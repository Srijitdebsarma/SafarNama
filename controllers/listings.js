const Listing=require("../models/listing");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const { cloudinary } = require("../cloudConfig.js");
require("dotenv").config();

//for mapping
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geoCodinngClient = mbxGeoCoding({ accessToken: mapToken });



//search functionality
module.exports.searchBar=async(req, res) => {
  const query = req.query.search; // Extract the search query from the request query
  const allListings = await Listing.find({
    $or: [
      { title: { $regex: query, $options: 'i' } }, // Case-insensitive regex search for title
      { location: { $regex: query, $options: 'i' } } // Case-insensitive regex search for location
    ]
  });
  res.render("listings/index.ejs", { allListings });
  }

module.exports.search=async(req, res) => {
  const category = req.params.category;
  let allListings=await Listing.find({ category: category })
  res.render("listings/index.ejs", {allListings });
  }


//index route
module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
  };

//render create form
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
  };

//post new created listing
module.exports.postNewCreatedListing=async(req,res,next)=>{
  //main uploading task is done on listing.js
      
      //req.file theke data extraction
      let url=req.file.path; 
      let filename=req.file.originalname;
      let {title,description,expense,category,travel,speciality,food,location,country}=req.body;  //extraction for post req
      let newListing={
      title:title,
      description:description,
      expense:expense,
      location:location,
      country:country,
      image:{url,filename},
      food:food,
      speciality:speciality,
      travel:travel,
      category:category,
      owner:req.user._id, //we need the id of the owner
      }
      var query = `${location}, ${country}`;  //location and country pair is given to mapbox api
      let response=await geoCodinngClient.forwardGeocode({
        query: query,
        limit:1
      })
        .send();
      const newData=new Listing(newListing);
      newData.geometry=response.body.features[0].geometry;
      await newData.save(newData);  //save to the database
      //adding a flash message
      req.flash("success","new listing created");
      res.redirect("/listings");
  };


//show the listing in detail
module.exports.showListing=async (req, res, next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    if (!listing) {
      // If listing detail not found, throw an error
      req.flash("error", "Listing is deleted");
      return res.redirect("/listings");
    }
    
    // Pass success message to the template if needed
    res.render("listings/show.ejs", { detail:listing});
};


//update a listing form
module.exports.updateAListingForm=async (req,res)=>{
    let {id}=req.params;
    let data=await Listing.findById(id);

    //for lowering the edit preview image quality
    let origialImageURL=data.image.url;
    origialImageURL=origialImageURL.replace("/upload","/upload/w_250/e_blur:100");
    res.render("listings/edit.ejs",{data,origialImageURL});
};

//updateThe Listing 
module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    //req.file theke data extraction
      var url=""; 
      var filename="";
    if(typeof(req.file)!=="undefined"){ //if that exists
      url=req.file.path; 
      filename=req.file.originalname;
    }
    
    let {title,description,expense,category,travel,speciality,food,location,country}=req.body;  //extraction for post req
    let updatedData={
      title:title,
      description:description,
      location:location,
      country:country,
      image:{url,filename},
      owner:req.user._id,
      expense:expense,
      food:food,
      speciality:speciality,
      travel:travel,
      category:category,
    };
    let result=listingSchema.validate(updatedData); 
    if(result.error.message!==`"value" is not allowed` && result.error){
      throw new ExpressError(400,"Send valid data for listing");
    }
    await Listing.findByIdAndUpdate(id,updatedData);
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

//destroy a listing

module.exports.destroyAListing=async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    res.redirect(`/listings`);
};


