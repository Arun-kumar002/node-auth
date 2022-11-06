const express=require('express')
const {registerTemplate,registerPost,loginpost,LoginTempate,logout,profile}=require('../controller/auth');
const {ensureAuthenticated}=require('../helper/auth_helper')
const {check,validationResult}=require('express-validator')
const bodyparser=require('body-parser')
let urlencoded=bodyparser.urlencoded({extended:false})
const app=express()
const route=express.Router()
app.use(express.json());

route.get('/register',registerTemplate);
route.get('/login',LoginTempate)

route.post('/register',urlencoded,[
    check('username','the username is require and must be 5 characters') .isLength({min:5}),  
    check('email','please enter proper email id').isEmail(), 
    check('password','password is must be 5 characters').isLength({min:5}),
    check('conformpassword','conformpassword password is must be 5 characters').isLength({min:5})
   
],registerPost)
route.post('/login',loginpost)
route.get('/logout',logout)

route.get('/profile',ensureAuthenticated,profile)



module.exports=route;