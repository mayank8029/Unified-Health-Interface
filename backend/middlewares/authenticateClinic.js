const jwt = require('jsonwebtoken')

const  authenticateClinic = (req , res , next)=>{
      const token = req.headers.authorization.split(' ')[1] ; 

      if(!token){
        return res.status(401).json({
            message:"not token, authorization denied"
        })
      }

      try{
        const decoded = jwt.verify(token , process.env.SECRET)

        req.clinic = decoded.clinicId ; 
        next() ;
      }catch(err){
        res.status(401).json({message:"token is not valid"})
      }
}

module.exports={authenticateClinic}