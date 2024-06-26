const express=require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
//cotrollers
const userController=require("../controllers/users.js");

//signup
router.get("/signup", (userController.signUpForm) );
router.post("/signup", wrapAsync(userController.signUp));

//login
router.get("/login",(userController.loginForm));
router.post("/login", saveRedirectUrl, passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}) ,wrapAsync(userController.login));

//logout
router.get("/logout", (userController.logout));


module.exports=router;


