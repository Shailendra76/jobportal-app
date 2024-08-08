const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require("../models/userModels"); // Change user to User

// is user authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    
    
   

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('You must log in.....!', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token,`${process.env.JWT_SECRET}` );
        

        req.user = await User.findById(decoded.id);
     
       
        next();

    } catch (error) {
        return next(new ErrorResponse('You must log in...!', 401));
    }
}
//middleware for admin
exports.isAdmin = (req,res,next)=>{
    if (req.user.role === 0){
        return next(new ErrorResponse('You must admin!', 401));
    }
    next();
}
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID and attach it to the request object
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            return next(new ErrorResponse('Not authorized, token failed', 401));
        }
    }

    if (!token) {
        return next(new ErrorResponse('Not authorized, no token provided', 401));
    }
});