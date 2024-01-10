const { default: mongoose } = require("mongoose");

exports.connectToDatabase=()=>{
      try {

        mongoose.connect('mongodb+srv://Unified-Health-Interface:Unified-Health-Interface-123@cluster0.4fqgkpc.mongodb.net/')
        console.log("database connected")
        
      } catch (error) {
        console.log(error) ; 
        
      }
}

