const express = require("express") ; 
const router = express.Router()

const {UserRegister, userLogin} = require('../controllers/user')

router.post('/register' , UserRegister)
router.get('/login'  , userLogin)
router.get('/doctors')


module.exports = router 



