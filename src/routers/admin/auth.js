const express = require('express');
const router = express.Router();
const {signup, signin} =  require('../../controllers/admin/auth')
const {validatorSignupResult,  isRequestValidated, validatorSigninResult} = require('../../validators/auth')

router.post('/admin/signup',validatorSignupResult, isRequestValidated,  signup)
router.post('/admin/signin', validatorSigninResult, isRequestValidated, signin)


  module.exports = router;