const express=require("express");
const router = express.Router({mergeParams:true}); // to acess extra things of the url
const wrapAsync=require("../utils/wrapAsync.js");

const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn,isAuthor}=require("../middleware.js");
//cotrollers
const reviewController=require("../controllers/reviews.js");


//create a review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createAReview));

  
//Delete Review Route
router.delete("/:reviewID",isLoggedIn,isAuthor, (reviewController.destroyAReview));

  
  module.exports=router;