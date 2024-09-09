 const express = require('express');
 const router = express.Router();
 const {signup,signin,logout,userProfile}= require('../controllers/authController');
 const { isAuthenticated } = require('../middleware/auth');
 const { googleLogin, googleCallback, logout } = require('../controllers/authController');

//  auth routes
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/logout',logout);
router.get('/me', isAuthenticated,userProfile);
router.get('/auth/google', googleLogin);
router.get('/auth/google/callback', googleCallback);
module.exports = router;