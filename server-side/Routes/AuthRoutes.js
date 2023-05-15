const router = require('express').Router();
const AuthController = require('../Controllers/AuthController.js');

//signUp 
router.post('/signup' ,AuthController.Register);
// send email 
router.post('/sendMail' ,AuthController.SendEmailToChangePassword);
//confrimEmail
router.get('/confrimEmail:userID' , AuthController.cofrimEmail);
//forgetpassword
router.get('/forgetPassword' , AuthController.forgetPassword);
//login
router.post('/login' ,AuthController.login);


module.exports = router;