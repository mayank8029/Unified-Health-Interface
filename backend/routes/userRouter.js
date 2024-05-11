const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authenticateUser')
const {
  UserRegister,
  userLogin,
  userProfile,
  editUserProfile,

} = require('../controllers/user');


// User authentication routes

router.post('/register', UserRegister);
router.post('/login', userLogin);

// User profile routes
router.get('/your-profile',authMiddleware, userProfile);
router.put('/your-profile/edit',authMiddleware, editUserProfile);



module.exports = router;
