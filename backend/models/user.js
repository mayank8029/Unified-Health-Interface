const mongoose = require('mongoose')
const {MedicalReportModel , MedicalReportSchema} = require('./MedicalReport')
const  {appointmentModel , appointmentSchema} = require('./Appointment')
const consultedDoctorSchema = new mongoose.Schema({
    doctor_id: { type: String, required: true },
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reason: { type: String, required: true }
  });


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
    } ,
    
    doctors:{
        type:[consultedDoctorSchema]
    },

    medicalReports:{
        type:[MedicalReportSchema]
    } ,

    appointmentSchema:{
        type:[appointmentSchema]
    }
        

})


const user = mongoose.model('user' , userSchema)
module.exports={user}
