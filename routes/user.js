const express= require("express");

const WrapAsync = require("../utils/WrapAsync");

const router= express.Router();
const passport=require("passport");
const { saveredirecturl } = require("../middleware.js");

const userController= require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignup)
    .post(WrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.renderlogin)
    .post(saveredirecturl,passport.authenticate("local",{ failureRedirect: "/login",
    failureFlash:true,
}),userController.login);




module.exports=router;