const Listing=require("./models/listing"); 
const Review=require("./models/review"); 
const { listingSchema,reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){ //if not logged in
        //redirect URL must store
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","You must be logged in to SafarNama!");
        return res.redirect("/login");  //user can see listings without login
      }
      //console.log(req.user);  //it stores the current user info
      next();
}


module.exports.saveRedirectUrl= (req,res,next)=>{
  if(req.session.redirectUrl){
    //save that as local variable
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}


module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id); //for listing owner info
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    //current user id is mismatched with owner id
    req.flash("error","You don't have permission to do so");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

//not working
module.exports.validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }else{
    next();
  }
}


//Schema Validation function
module.exports.validateReview=(req,res,next)=>{
  let{error} = reviewSchema.validate(req.body); 
  //reviewSchema JOi er madhome ja esche sei validate kore felbe
  if(error){
    let errMsg="Not a valid comment";
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
}

module.exports.isAuthor=async(req,res,next)=>{
  let {id,reviewID}=req.params;
  let review=await Review.findById(reviewID); //for review author info
  // console.log(review);
  if(!review.author.equals(res.locals.currUser._id)){
    //current user id is mismatched with author id
    req.flash("error","You are not the author");
    return res.redirect(`/listings/${id}`);
  }
  next();
}