require("dotenv").config();
const express= require('express');
const app=express();
const mongoose=require("mongoose"); //our database connection
const path= require("path");
const methodOverride= require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const listingRouter=require("./routes/listing.js");  //all the routes connected to listings
const reviewRouter=require("./routes/review.js");  
const userRouter=require("./routes/user.js");  
const cookieParser=require('cookie-parser');
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
//configuring stratergy
const passport = require('passport');
const LocalStratergy=require("passport-local").Strategy; // Correct import and usage of LocalStrategy
const User=require("./models/user.js");
const DBURL=process.env.CONNECTION_LINK;
const SECRET=process.env.SECRETCODE;

const store=MongoStore.create({
  mongoUrl:DBURL,
  crypto:{
    secret:SECRET,
  },
  touchAfter:360*24, //kono interaction na hole 24hrs por session update hba
})

store.on("error",()=>{  //if any error happened
  console.log(err);
})
const sessionOptions={  
  store,  //session er data o store hba 
  secret:SECRET,
  resave:false, 
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000, //1 week in mili seconds
    httpOnly:true,  //for security purposes for cross scripting attacks
  }
};




app.listen(8080, ()=>{   //running our app on 8080
    console.log('Server is listening on port 8080');
});


//database connection
async function main() {
  mongoose.connect(DBURL);
}
main()
 .then(()=>{
  console.log("Connected to SafarNama database");
 })
 .catch(err => console.log(err));



//middlewares
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})); //middelware to parse url encoded data
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);  //for using ejsMates 
app.use(express.static(path.join(__dirname, "/public"))); //setting the directory for CSS static files
app.use(cookieParser());
 
app.use(session(sessionOptions));
app.use(flash()); //for flash messages

//passports-for user authentication 
app.use(passport.initialize());
app.use(passport.session()); //session diye same user req krche ki bujha jai
passport.use(new LocalStratergy(User.authenticate())); //login kore jno user
// Serialize and Deserialize User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{ //if any flash msg comes here it will store it
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})



//routing-s
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);



//if proti ta route check korar por o page na pao then ei route ta 
//seta catch krbe and akta notun expresserror generate kore dba
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page not found"));
})


//Custom Error Handling
//ei middleware ta error ta k track korbe and then output pthiya dba
app.use((err, req, res, next) => {
  if (!res.headersSent) { // Check if headers have been sent
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { err });
  } else {
    next(err); // If headers have been sent, pass the error to the default error handler
  }
});
