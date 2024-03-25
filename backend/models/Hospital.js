const mongoose = require('mongoose') ; 

const hospitalSchema = mongoose.Schema({
    name:{
        type:String , 
        required:true , 
    },
    address:{
        type:String , 
        required:true , 
    },
    patientIds:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    doctorIds:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'doctor'
    },

})

const hospital= mongoose.model("hospital" , hospitalSchema)
module.exports={hospital} 