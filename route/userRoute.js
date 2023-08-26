const express = require('express');
const router = express.Router();


const {registerUser,verifyUser}=require('../controller/Registration/signup')

const {loginUser}=require('../controller/Registration/login')

router.post(
  '/register',
  registerUser
)
router.post(
  '/register/verify',
  verifyUser
)
router.post(
    '/login',
    loginUser
)
module.exports = router;