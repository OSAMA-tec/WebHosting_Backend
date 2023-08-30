const express = require('express');
const router = express.Router();


const {Singup}=require('../controller/Admin/signup')

const {Login}=require('../controller/Admin/login')

router.post(
  '/register',
  Singup
)
router.post(
    '/login',
    Login
)
module.exports = router;