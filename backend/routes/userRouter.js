const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth')
const {
  UserRegister,
  userLogin,
  userProfile,
  editUserProfile,
  getHospitalList,
  getHospitalDetails,
  createAppointmentWithHospital,
  getAllDoctors,
  createAppointmentWithDoctor,
  getHealthRecord,
  getHealthRecordById,
  getCentralGovSchemes,
  getStateGovSchemes,
  getGlobalHealthAid,
  getHealthInsuranceCompanies,
  getInsuranceList,
  getInsuranceDetails,
  buyInsurance,
  getAppointmentDetails,
  getAppointmentDetailsById,
  editAppointmentDetails,
  cancelAppointment,
  getAllReviews,
  getReviewById,
  editReview,
  deleteReview,
  getComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint
} = require('../controllers/user');


// User authentication routes

router.post('/register', UserRegister);
router.post('/login', userLogin);

// User profile routes
router.get('/your-profile',authMiddleware, userProfile);
router.put('/your-profile/edit',authMiddleware, editUserProfile);

// // Hospital routes
// router.get('/hospitals', getHospitalList);
// router.get('/hospitals/:hospitalId', getHospitalDetails);
// router.post('/hospitals/:hospitalId/appointments', createAppointmentWithHospital);
//  // ---------------- There are something that we improve here like get doctors of hospital and then make appointment 

// // Doctor routes
// router.get('/doctors', getAllDoctors);
// router.post('/doctors/:doctorId/appointments', createAppointmentWithDoctor);

// // Health record routes
// router.get('/healthrecords', getHealthRecord);
// router.get('/healthrecords/:recordId', getHealthRecordById);

// // Health care scheme routes
// router.get('/centralgovscheme', getCentralGovSchemes);
// router.get('/stategovscheme', getStateGovSchemes);
// router.get('/globalhelp', getGlobalHealthAid);

// // Health insurance routes
// router.get('/health-insurance-company', getHealthInsuranceCompanies);
// router.get('/health-insurance-company/insurances', getInsuranceList);
// router.get('/health-insurance-company/insurances/:insuranceId', getInsuranceDetails);
// router.post('/health-insurance-company/insurances/:insuranceId/buy', buyInsurance);

// // Appointment details routes
// router.get('/appointment-details', getAppointmentDetails);
// router.get('/appointment-details/:appointmentId', getAppointmentDetailsById);
// router.put('/appointment-details/:appointmentId/edit', editAppointmentDetails);
// router.put('/appointment-details/:appointmentId/cancelation', cancelAppointment);

// // Review routes
// router.get('/reviews', getAllReviews);
// router.get('/reviews/:reviewId', getReviewById);
// router.put('/reviews/:reviewId/editreview', editReview);
// router.delete('/reviews/:reviewId', deleteReview);

// // Complaint routes
// router.get('/complaints', getComplaints);
// router.post('/complaints', createComplaint);
// router.put('/complaints/:complaintId', updateComplaint);
// router.delete('/complaints/:complaintId', deleteComplaint);

module.exports = router;
