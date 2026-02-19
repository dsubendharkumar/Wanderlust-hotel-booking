const express=require("express");
const router= express.Router({mergeParams: true});
const wrapAsync= require("../utils/WrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");


const {validatereview, isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");


router.post("/",isLoggedIn, validatereview,wrapAsync(reviewController.createReview));

router.delete("/:review_id/delete",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;
