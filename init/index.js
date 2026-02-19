const mongoose = require("mongoose");
const info = require("./data.js");
const listing = require("../models/listing.js");

main().then(res=>{console.log("connected successfully")})
.catch(err=>{console.log(err)});

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    
};

async function init() {
    await listing.deleteMany({ });
    info.data=info.data.map((obj)=>({
        ...obj,owner:"6989eb9c2b7bbc86a9e16a9f",
    }));
    await listing.insertMany(info.data);
    console.log("insert successfully");

    
};

init().then(res=>{console.log(res)}).catch(err=>{console.log(err)});




    <%} %>
