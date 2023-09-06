const express = require('express');
const router = express.Router();

const auth=require('../config/auth')

const {Singup}=require('../controller/Admin/signup')

const {Login}=require('../controller/Admin/login')
const {updateAdmin}=require('../controller/Admin/updateData')

const {createUser}=require('../controller/Admin/createUser')

const {getUnacceptedOrders}=require('../controller/Admin/pending')
const {getAcceptedOrders}=require('../controller/Admin/acceptOrder')



router.post(
  '/register',
  Singup
)
router.post(
    '/login',
    Login
)
//Update data
router.put('/admin/:id', auth,updateAdmin);
//createUser
router.post('/user',auth,createUser );
//pending 
router.get('/user/pending',auth,getUnacceptedOrders );
//accept
router.get('/user/accept',auth,getAcceptedOrders );
module.exports = router;