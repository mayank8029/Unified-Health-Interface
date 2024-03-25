const mongoose = require('mongoose')
const {hospital} = require('./Hospital');
const { func } = require('joi');

const addressSchema = mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
});

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
    specialization:{
        type:[String], 
        rquired:true , 
    },
    hospital:{

            type:Schema.Types.ObjectId,
            ref:'hospital', 
        required:function(){
            return !this.Clinic;
        }
    },
    Clinic:{
        type:String,
        required:function(){
            return !this.hospital;
        }

    },
    
    qualifications: {
      type: Array,
    },
  
    experiences: {
      type: Array,
    },
  
    bio: { type: String, maxLength: 50 },
    about: { type: String },
    timeSlots: { type: Array },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
    address:{
        type: addressSchema,
        required: true 
    }
})


const doctor = mongoose.model('doctor' , doctorSchema) ;

module.exports(doctor)