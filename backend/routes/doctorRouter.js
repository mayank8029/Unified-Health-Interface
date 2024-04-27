const express = require("express") ; 
const { registerDoctor, loginDoctor, editDoctorDetails, getDoctorProfile } = require("../controllers/doctor");
const authenticateDoctor = require("../middlewares/authenticateDoctor");
const router = express.Router()



//register and login 
router.post('/register' , registerDoctor)
router.get('/login' , loginDoctor)

//profile 
router.get('/profile' , getDoctorProfile)
router.put('/profile/edit',authenticateDoctor , editDoctorDetails)

//appointments
router.get('/appointment')
router.delete('/appointment')

//patients
router.get('/patients')
router.get('patients/:patientId')
router.get('Patients/:patientId/patient-records')//only those records which are created by doctor 

//access for record 
router.get('/patients/:patientId/get-access-records')


// get feedback 
router.get('/feedback')




module.exports = router 