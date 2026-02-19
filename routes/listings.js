const express= require("express");
const router= express.Router();
const listing = require("../models/listing.js");

const wrapAsync= require("../utils/WrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {isLoggedIn,isowner,validateListing, isReviewAuthor}= require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage});






router.get("/",wrapAsync(listingController.index));

router.get("/:id/show",wrapAsync(listingController.showListing));

router.delete("/:id/delete",isLoggedIn,isReviewAuthor,wrapAsync(listingController.deleteListing));

router
    .route("/new")
    .get(isLoggedIn,listingController.renderNewForm)
    .post( isLoggedIn,validateListing ,wrapAsync(listingController.createListing));
    



router
    .route("/:id/edit")
    .get(isLoggedIn,isowner,wrapAsync(listingController.renderEditFrom))
    .put(isLoggedIn,isowner,wrapAsync(listingController.editListing));




module.exports=router;


