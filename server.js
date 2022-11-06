const express = require("express")
const {PORT, MONGODB_URL} = require("./config/index") 
const {connect } = require("mongoose")
const Handlebars = require("handlebars")
const {engine} =require("express-handlebars")
const flash = require("connect-flash")
const session = require("express-session")
const nodeAuth=require('./routes/movies')
const passport=require('passport')
const app = express()
//swagger starts


let yaml=require('yamljs')
let swagger=require('swagger-ui-express')
let yamldocs=yaml.load('./Model/api1.yaml')
app.use('/docs',swagger.serve,swagger.setup(yamldocs))





//swagger ends
require('./middlewares/passport')(passport)

//passport section


Handlebars.registerHelper("noop", function(options) {
    return options.fn(this);
  });
connect(MONGODB_URL, err => {
    if(err) throw err
    console.log("DB connected successfully")
})



app.use(
    session({
        secret:"hari",
        resave:true,
        saveUninitialized: false,
    })
)
app.use(flash())
app.use(passport.initialize());
app.use(passport.session())
app.use(function (req,res, next) {
    res.locals.SUCCESS_MSG = req.flash("SUCCESS_MSG")
    res.locals.ERROR_MSG = req.flash("ERROR_MSG")
    res.locals.error = req.flash("error")
    res.locals.user=req.user || null;
    next()
})
// express handlebars
app.engine("handlebars" , engine());
app.set("view engine", "handlebars")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))



app.get("/", (req, res) => {
    res.render("home")
})
app.use('/auth',nodeAuth)



app.listen(PORT, err => {
    if(err) throw err;
    console.log(`server is running on port number${PORT}`)
})