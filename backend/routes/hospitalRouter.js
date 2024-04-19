const express = require("express") ; 
const router = express.Router()

const {registerHospital , loginHospital ,getHospitalDetails , editHospitalDetails , getHospitalList} = require('../controllers/hospital')
const {authenticateHospital} = require("../middlewares/authenticateHospital")


router.post('/register' , registerHospital)
router.get('/login' , loginHospital)

// Hospital routes
router.get('/hospitals',   getHospitalList);
router.get('/hospitals/:hospitalId', getHospitalDetails);
router.put('/hospitals/:hospitalId/edit',authenticateHospital , editHospitalDetails)
// router.post('/hospitals/:hospitalId/appointments', createAppointmentWithHospital);



//  // ---------------- There are something that we improve here like get doctors of hospital and then make appointment
module.exports = router 