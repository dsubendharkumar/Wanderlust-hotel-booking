const mongoose = require("mongoose");
const review = require("./reviews");
const { string } = require("joi");

const listschema= new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    price:{
        type:Number,

    },
    location:String,
    country:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

});

listschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        let res=await review.deleteMany({_id:{$in: listing.reviews}});
        console.log(res);
    }
});

const listing = mongoose.model("listing",listschema);

module.exports=listing;