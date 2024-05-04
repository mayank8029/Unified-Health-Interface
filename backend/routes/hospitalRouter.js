const express = require("express") ; 
const router = express.Router()

const {registerHospital , loginHospital ,getHospitalDetails , editHospitalDetails , getHospitalList} = require('../controllers/hospital')
const {authenticateHospital} = require("../middlewares/authenticateHospital")


router.post('/register' , registerHospital)
router.get('/login' , loginHospital)

// Hospital routes
router.get('/gethospitals/search',   getHospitalList);
// Geolocation Search: http://localhost:3000/api/hospitals/search?longitude=77.5946&latitude=12.9716
// City Search: http://localhost:3000/api/hospitals/search?city=Bangalore
// State Search: http://localhost:3000/api/hospitals/search?state=Karnataka
// Pagination with City Search: http://localhost:3000/api/hospitals/search?city=Bangalore&page=1&limit=10


router.get('/gethospitals/:hospitalId', getHospitalDetails);
router.put('/gethospitals/:hospitalId/edit',authenticateHospital , editHospitalDetails)
// router.post('/hospitals/:hospitalId/appointments', createAppointmentWithHospital);


//  // ---------------- There are something that we improve here like get doctors of hospital and then make appointment
module.exports = router 