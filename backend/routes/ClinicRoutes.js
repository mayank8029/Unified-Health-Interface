const { editClinicDetails, getClinicDetails, getClinicList, loginClinic, registerClinic } = require( "../controllers/Clinic");
const {authenticateClinic} = require("../middlewares/authenticateClinic")

const express = require("express")
const router = express.Router() ; 



//register and login 
router.post('/register' , registerClinic)
router.get('/login', loginClinic)

//get clinic list based on filter
router.get('/getclinics/search' , getClinicList)

//get clinic details and edit them 
router.get('/getclinics/:clinicid', getClinicDetails);
router.put('/getclinics/:clinicId/edit',authenticateClinic , editClinicDetails)


module.exports = router ; 