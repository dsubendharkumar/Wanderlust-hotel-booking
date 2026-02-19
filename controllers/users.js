
const user=require("../models/user.js");



module.exports.renderSignup= (req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
         console.log(req.body);
    let {username,email,password}=req.body;
   

    let user1= new user({email,username});

    let saveuser= await user.register(user1,password);
    console.log(saveuser);
    req.login(saveuser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success","WellCome to Wonderlust");
        res.redirect("/listings");
    });
    
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }

}

module.exports.renderlogin=(req,res)=>{
    res.render("user/login.ejs");
}
module.exports.login = async(req,res)=>{
    req.flash("success","wellcome to wonderlost!...");
    let redirecturl=res.locals.redirectUrl || "/listings"
    
    res.redirect(redirecturl);

}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out !");
        res.redirect("/listings");
    })
}