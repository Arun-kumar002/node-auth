const authSchema=require('./../Model/Model')
const passport=require('passport');
const bcrypt=require('bcryptjs')
const {check,validationResult}=require('express-validator')
var payloadCheck = require('payload-validator');
// get request
const registerTemplate = (req, res) => {
    res.render("auth/register")
}

// post request 
const registerPost = async (req,res) => {
    
    try{
        console.log(res.query);
        // console.log(req.body);
        // let target = {
        //     "username" : "Arunkumar",
        //     "email" : 'dexter@gmail.com',
        //     "password" : '123423',
        //     "confirmpassword":'2266256'
        // }
        // let result = payloadCheck.validator(req.body, target, ['']);
        // console.log(result);
        
        let {username, email, password, confirmpassword } = req.body;
       
    
     const errors=validationResult(req)
    //  console.log(errors)
        if(!errors.isEmpty()){
          let alert=errors.array()
            res.render('auth/register',{alert})
        }
       
        
        else{
            let user=await authSchema.findOne({email});
            console.log(user)
            if(user){
                req.flash('ERROR_MSG','alread registered')
                res.redirect('/auth/register',302,{})
            }
            else{
                let newuser=await new authSchema({
                    username,
                    email,
                    password
                })
                bcrypt.genSalt(5,(err,salt)=>{
                    if(err) throw err;
                    bcrypt.hash(newuser.password,salt,async(err,hash)=>{
                            if(err) throw err;
                            newuser.password=hash;
                            await newuser.save();
                            req.flash('SUCCESS_MSG','successfully user registered')
                            res.redirect('/auth/register',301,{})
                             }) })
                      }
           
        }
    }catch (error){
         console.log(error)
    }

}

let LoginTempate=(req,res)=>{
    res.render('auth/login')
}
//passport

let loginpost=(req,res,next)=>{
   passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/auth/login',
    failureFlash:false,
   })(req,res,next);
} 

//logout
const logout=(req,res)=>{
    req.logout(()=>{

    })//clear the session
    req.flash('SUCCESS_MSG','successfully logged out');
    res.redirect('/auth/login',301,{})
}
//grt profile
const profile=async(req,res)=>{
    let user=await authSchema.find({}).lean();
    res.render('profile/user',{user})
}

module.exports={registerPost,registerTemplate,loginpost,LoginTempate,logout,profile}
