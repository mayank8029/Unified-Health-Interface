const jwt = require('jsonwebtoken')

const  authenticateHospital = (req , res , next)=>{
      const token = req.headers.authorization.split(' ')[1] ; 

      if(!token){
        return res.status(401).json({
            message:"not token, authorization denied"
        })
      }

      try{
        const decoded = jwt.verify(token , process.env.SECRET)

        req.hospital = decoded.hospitalId ; 
        next() ;
      }catch(err){
        res.status(401).json({message:"token is not valid"})
      }
}

module.exports={authenticateHospital}