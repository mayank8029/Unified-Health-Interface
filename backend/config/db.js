const { default: mongoose } = require("mongoose");


exports.connectToDatabase=()=>{
      try {
        console.log("hello my name is mayank")
       
        mongoose.connect(process.env.MONGOURL)
        console.log("database connected")
        
      } catch (error) {
        console.log(error) ; 
        
      }
}

