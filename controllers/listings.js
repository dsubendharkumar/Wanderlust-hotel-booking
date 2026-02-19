const listing = require("../models/listing.js");


module.exports.index= async (req,res)=>{
    let allListings = await listing.find({ });
    res.render("listings/all_data.ejs",{allListings});

}

module.exports.showListing= async (req,res)=>{
    let {id}=req.params;
    
    let list= await listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
        }
      })
      .populate("owner");
    if(!list){
       
        req.flash("error","Listing you requested for does not exists!");
        return res.redirect("/listings");
    }
    
    res.render("listings/showmore.ejs",{list});
}

module.exports.renderNewForm= (req,res)=>{
    //  console.log(req.user);
    
    res.render("listings/newlist.ejs");
}

module.exports.createListing= async (req,res,next)=>{

    // let url = req.file.path;
    // let filename= req.file.filename;
    // console.log(url,"..",filename);
    
    
    // let {title,description,image,price,location,country}=req.body;
    // console.log(req.body);
    // let newlist=new listing({
    //  title: req.body.title,
    //  description: req.body.description,
    //  image: req.body.image,
    //  price: req.body.price,
    //  location: req.body.location,
    // country: req.body.country
    // });

    let newlist=new listing(req.body.listing);
    newlist.owner=req.user._id;
    await newlist.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
   
}

module.exports.renderEditFrom=async (req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    if(!list){
        req.flash("error","Listing you requested for does not exists!");
        return res.redirect("/listings");
    }
    
    res.render("listings/edit.ejs",{list});
}

module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
    
     let update= await listing.findByIdAndUpdate(id,req.body);
     console.log(update);
     req.flash("success","listing is edited");
     res.redirect(`/listings/${id}/show`);
}

module.exports.deleteListing= async (req,res)=>{
    let {id}=req.params;
    let del = await listing.findByIdAndDelete(id);
    console.log(del);
    req.flash("success","listing is deleted");
    res.redirect("/listings");

}

