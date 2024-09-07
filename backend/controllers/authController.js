const User = require('../models/userModels');
const ErrorResponse = require('../utils/errorResponse');

// Signup
exports.signup = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new ErrorResponse("E-mail already registered", 400));
    }

    // Create new user
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Signin
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email) {
      return next(new ErrorResponse("Please add an email", 400));
    }
    if (!password) {
      return next(new ErrorResponse("Please add a password", 400));
    }

    // Check user email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    // Check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Send token response
const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();

  res.status(codeStatus)
    .cookie('token', token, {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'None' // Required for cross-site cookies
    })
    .json({
      success: true,
      role: user.role
    });
};

// Logout
exports.logout = (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None'
  });
  res.status(200).json({
    success: true,
    message: "Logged out"
  });
};

// User profile
exports.userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};
