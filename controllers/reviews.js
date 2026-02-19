const Review=require("../models/reviews.js");
const listing= require("../models/listing.js");



module.exports.createReview=async (req,res)=>{
    let{id}=req.params;
    console.log(id);
    let newlisting= await listing.findById(req.params.id);
    let newreview = await new Review(req.body.review);
    newreview.author=req.user._id;
    console.log(req.body);

    newlisting.reviews.push(newreview);

    let result= await newreview.save();
    console.log(result);
    await newlisting.save();
    
    req.flash("success","review is add successfully!");
    res.redirect(`/listings/${id}/show`);

}

module.exports.deleteReview= async(req,res)=>{
    let {id,review_id}=req.params;
    
    await listing.findByIdAndUpdate(id, {$pull:{reviews: review_id}});
    await Review.findByIdAndDelete(review_id);
    req.flash("success","review is deleted successfully!");
    res.redirect(`/listings/${id}/show`);

}



