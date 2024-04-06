const express = require("express") ; 
const router = express.Router()



//register and login 
router.post('/register')
router.get('/login')

//profile 
router.get('/profile')
router.put('/profile/edit')

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