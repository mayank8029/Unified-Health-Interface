const express = require("express") ; 
const router = express.Router()

const {UserRegister, userLogin} = require('../controllers/user')

// login register 
router.post('/register' , UserRegister)
router.get('/login'  , userLogin)

// profile and edit profile 
router.get('/profile')
router.put('/editprofile')

// hospitals and hospital 
router.get('/hospitals')
router.get('/hospitals/hospitalId')
router.post('/hospitals/hospital/doctor/appointment')

// doctors and doctor
router.get('/doctors')
router.post('/doctorId/appointment')

//healthRecord
router.get('/healthrecords')
router.get('/healthrecords/recordId')

//HealthCare Scheme 
router.get('/centralgovscheme')
router.get('/stategovscheme')
router.get('/globalhelp')

//HealthServiceProvider 
router.get('/healthInsuranceCompany')
router.get('/healthInsuranceCompany/insurances')
router.get('/healthInsuranceCompany/insurances/insuranceDetails')
router.get('healthInsuranceCompany/insurances/insuranceId/buy')

//appointment Details
router.get('/appointmentDetails')
router.get('appointmentDetails/appointmentId')
router.put('appointmentDetails/appointmentId/edit')
router.put('appointmentDetails/appointmentId/cancelation')


// review routes 
router.get('/reviews')
router.get('/reviews/reviewId')
router.put('/reviews/reviewId/editreview')
router.delete('/reviews/reviewId')

module.exports = router 



