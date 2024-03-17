const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
    firstName: {
        type:String, 
        required:true
    },
    lastName: {
     type:String ,
     required:true ,  
    },
    email:{
        type:String, 
        required:true , 
        unique:true 
    } ,
    password: {
       type: String ,
       required: true 
    },
    phoneNumber:{
        type: String,
        unique:true , 
        required:true , 
    } ,
    gender:{
        type:String , 
        required:true , 
    },
    dob:{
        type:Date,
        required:true 
    } 
        

})

const user = mongoose.model('user' , userSchema)

module.exports={user}
