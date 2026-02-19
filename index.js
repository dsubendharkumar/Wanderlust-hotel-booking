if(process.env.NODE_ENV != "production"){
require("dotenv").config();
}

// console.log(process.env.SECRET);



const express=require("express");
const app = express();
const mongoose = require("mongoose");

const listing = require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync= require("./utils/WrapAsync.js");
const ExpressError= require("./utils/ExpressError.js");
const Review=require("./models/reviews.js");
const {listingSchema,reviewSchema}=require("./schema.js");

const listingRouter= require("./routes/listings.js");
const reviewsRouter = require("./routes/review.js");
const userRouter= require("./routes/user.js");



const passport= require("passport");
const localstrategy= require("passport-local");
const user=require("./models/user.js");

const session=require("express-session");
const MongoStore = require('connect-mongo').default;
const flash=require("connect-flash");

const dburl= process.env.ATLASDB_URL;

const store= MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,

    },
    touchAfter: 24 * 3600,


});


const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge:7*24860*60*1000,
        httpOnly:true,
    }

};


store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());




// app.get("/demouser",async (req,res)=>{
//     let fakeuser=new user({
//         email:"student@gmail.com",
//         username:"harshita"
//     });

//     let registereduser=await user.register(fakeuser,"helloworld123");
    
//     res.send(registereduser);
// });













app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));





main().then(res=>{console.log("connected successfully")})
.catch(err=>{console.log(err)});

async function main() {

    await mongoose.connect(dburl);
    
};

// app.get("/textlisting", async (req,res)=>{
    
//     let list1 = new listing({
//     title:"sai balaji hostel",
//     description:"3 sharing..",
//     price:5000,
//     location:"hyderabad",
//     country:"india",
//     });

//     let listsave= await list1.save();

//     console.log(listsave);


// });


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
});


app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);












// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"page Not Found!"));
// })




app.use((err,req,res,next)=>{
    let {statusCode=500,message="somthing went wrong"}=err;
    res.render("listings/error.ejs",{message});
})

app.get("/",(req,res)=>{
    res.send("working...");
})



app.listen(8080,()=>{
    console.log("app is lostening");
})