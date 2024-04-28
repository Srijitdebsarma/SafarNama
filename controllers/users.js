const User=require("../models/user.js");

//signup form
module.exports.signUpForm=(req,res)=>{
    res.render("users/loginAndSignUp.ejs");
};

//actual create account
module.exports.signUp=async(req,res)=>{
    try{
    let{username,email,password}=req.body;
    let newUser=new User({
        email,
        username,
    })
    let registeredUser =await User.register(newUser,password);
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{  //it needs a callback also
      if(err){
        return next(err);
      }
      //passport default login
      req.flash("success","Welcome to SafarNama");
      res.redirect("/listings");
    });  
    }
    catch(error){
        req.flash("error",error.message);
        res.redirect("/signup");
    }
};

//login form
module.exports.loginForm=(req,res)=>{
    res.render("users/loginAndSignUp.ejs")
};

//actual login- managed by passport, after login
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome Back to SafarNama!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


//logout
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
      if(err){
        next(err);
      }
      req.flash("success","You are logged Out!");
      res.redirect("/listings");
    });
};