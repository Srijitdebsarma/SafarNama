const express=require("express");
const router = express.Router();

const {listingSchema}= require("../schema.js");
const wrapAsync=require("../utils/wrapAsync.js");
//for parse multiport data file 
const multer= require("multer");
const {storage}=require("../cloudConfig.js"); //cloudinary
const upload=multer({storage}); //where to save the uploaded files


const {isLoggedIn,isOwner, validateListing} = require("../middleware.js");
//cotrollers
const listingController=require("../controllers/listings.js");


  //index route
  router.get("/", wrapAsync(listingController.index));  //controller theke asche code
  
  //search functionality
  router.get("/search",(listingController.searchBar));
  router.get("/search/:category", (listingController.search));

  //create route 
  router.get("/new", isLoggedIn , (listingController.renderNewForm));
  //post new created listing
  router.post("/",
   isLoggedIn , upload.single("image"), wrapAsync(listingController.postNewCreatedListing)
  );
  
  //show route
  router.get("/:id", wrapAsync(listingController.showListing));

  
  //update Route
  router.get("/:id/edit", isLoggedIn ,isOwner,  wrapAsync(listingController.updateAListingForm));
  router.put("/:id", isLoggedIn ,isOwner,upload.single("image"), wrapAsync(listingController.updateListing)); 
  
  //destroy route
  router.delete("/:id", isLoggedIn ,isOwner, wrapAsync(listingController.destroyAListing));

 
  module.exports= router;