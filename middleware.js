const listing = require("./models/listing.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/reviews.js");

module.exports.isLoggedIn=(req,res,next)=>{

    if(!req.isAuthenticated()){
        console.log(req.originalUrl);
        req.session.redirectUrl=req.originalUrl;
        req.flash("success","you must looged to create the new list");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveredirecturl=(req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isowner=async(req,res,next)=>{
        let {id}=req.params;
        let list = await listing.findById(id);
        if(!list.owner._id.equals(res.locals.currentUser._id)){
            req.flash("error","you are not a owner! ");
            return res.redirect(`/listings/${id}/show`);
        }
        next();
}

module.exports.validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error){
        let errmsg= error.detailss.map((el)=> el.message).join(",");
        throw new ExpressError(400,errmsg);

    }else{
        next();
    }
};


module.exports.validatereview= (req,res,next)=>{
    let{error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg= error.detailss.map((el)=> el.message).join(",");
        throw new ExpressError(400,errmsg);

    }else{
        next();
    }
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,review_id}=req.params;
    let review = await Review.findById(review_id);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","your not the author to delete..");
        return res.redirect(`/listings/${id}/show`)
    }

    next();
};