const express = require('express');
const router = express.Router();


const {registerUser,verifyUser}=require('../controller/Registration/signup')
const {loginUser}=require('../controller/Registration/login')
const {updateUser}=require('../controller/User/updateData')
const {getAcceptedOrders}=require('../controller/User/order')
const {createBilling}=require('../controller/User/placeOrder')
const auth=require('../config/auth')




router.post('/register',registerUser)
router.post('/register/verify',verifyUser)
router.post('/login',loginUser)


//Update User
router.put('/update',auth,updateUser)

//Get Accept Order
router.get('/accept/order',auth,getAcceptedOrders)

router.post('/accept/order',auth,createBilling)

module.exports = router;