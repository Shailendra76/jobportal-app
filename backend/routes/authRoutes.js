 const express = require('express');
 const router = express.Router();
 const {signup,signin,logout,userProfile}= require('../controllers/authController');
 const { isAuthenticated } = require('../middleware/auth');
 const { googleLogin, googleCallback } = require('../controllers/authController');

//  auth routes
router.post('/signup',signup);
router.post('/signin',signin);
router.get('/logout',logout);
router.get('/me', isAuthenticated,userProfile);
router.get('/auth/google', googleLogin);
router.get('/custom/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        // Successful authentication, redirect home or to your frontend app.
        res.redirect('/profile'); // Adjust to your frontend URL
    }
);
module.exports = router;