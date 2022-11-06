const {model, Schema} = require("mongoose")

const authSchema = new Schema({
    username : {
        type:String,
       
    }, 
    email: {
        type:String,
        
    },
    password : {
        type:String,
       
    },
},{timestamps:true})

module.exports = model("authentication", authSchema)