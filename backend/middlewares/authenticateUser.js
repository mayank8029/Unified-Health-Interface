const jwt = require("jsonwebtoken")

const authMiddleware = (req , res , next)=>{
   const token = req.header('Authorization').replace('Bearer ', '')

   if(!token){
    return res.status(401).json({msg:"No token , authorization denied"})
   }

   try {
    const decoded =  jwt.verify(token , process.env.SECRET);
    req.userId = decoded.userId ;
    // now req.userId will going to have the userId of the user

    next();
   } catch (error) {

    return res.status(401).json({
        msg:"token not valid",
    })
    
   }

}

module.exports = authMiddleware ; 