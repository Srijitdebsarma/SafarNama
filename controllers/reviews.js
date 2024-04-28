const Review=require("../models/review.js");
const Listing=require("../models/listing.js");

//create a review
module.exports.createAReview=async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    //console.log( res.locals.currUser);
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success", "Your review has been added");
    res.redirect(`/listings/${listing._id}`);
};

//destroy a review
module.exports.destroyAReview=async(req,res)=>{
    let {id,reviewID}=req.params;
    //the review saved in both database
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewID}});
    await Review.findByIdAndDelete(reviewID);
    req.flash("success", "Your review has been deleted");
    res.redirect(`/listings/${id}`);
};