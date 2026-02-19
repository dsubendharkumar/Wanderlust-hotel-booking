const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    }
});

userSchema.plugin(passportLocalMongoose,{usernameFiled:"email"});

module.exports=mongoose.model("user",userSchema);

