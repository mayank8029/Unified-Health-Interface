const express = require("express") ; 
const router = express.Router()

router.post('/register')
router.get('/login')
router.get('/hospitalDetail')
router.put('/hospitalDetail')

// // Hospital routes
// router.get('/hospitals', getHospitalList);
// router.get('/hospitals/:hospitalId', getHospitalDetails);
// router.post('/hospitals/:hospitalId/appointments', createAppointmentWithHospital);
//  // ---------------- There are something that we improve here like get doctors of hospital and then make appointment
module.exports = router 