const express = require('express');
const router = express.Router();
const {signup, signin} =  require('../controllers/auth')
const { validatorSignupResult,  isRequestValidated, validatorSigninResult } =  require('../validators/auth')

router.post('/signup',validatorSignupResult, isRequestValidated,  signup)
router.post('/signin', validatorSigninResult, isRequestValidated, signin)

// router.post('/profile', requestSignin , (req, res)=>{
//   res.status(200).json({message : "profile"})
// })


  module.exports = router;