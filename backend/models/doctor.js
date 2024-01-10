const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    firstName:{
        type:String , 
        required:true 
    },
    lastName:{
        type:String , 
        required:true 
    },
    dob:{
        type:Date , 
        required:true 
    },
    phoneNumber:{
        type: Number , 
        required:true  , 
        unique: true 
    },
    email:{
       type:String , 
       required: true , 
       unique:true 
    },
    password:{
        type:String , 
        required:true , 
    },
    collage:{
        type:String , 
        required:true , 
    },
    specialization:{
        type:String, 
        rquired:true , 
    },
    hospital:{
        type:String , 
        required:true , 

    }
})


const doctor = mongoose.model('doctor' , doctorSchema) ;

module.exports(doctor)