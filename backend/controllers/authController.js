const User = require('../models/userModels');
const ErrorResponse = require('../utils/errorResponse');
const passport = require('passport');

// Signup (No changes required for Google authentication)
exports.signup = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new ErrorResponse("E-mail already registered", 400));
    }

    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Signin (No changes required for traditional signin)
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return next(new ErrorResponse("Please add an email", 400));
    }
    if (!password) {
      return next(new ErrorResponse("Please add a password", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Google OAuth Login
exports.googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// Google OAuth Callback
exports.googleCallback = passport.authenticate('google', {
  failureRedirect: '/login', // Redirect to login on failure
  session: false, // If you want to manage sessions with JWT
}), async (req, res, next) => {
  try {
    const { id, displayName, emails } = req.user; // Google's user profile

    // Check if user already exists
    let user = await User.findOne({ email: emails[0].value });
    if (!user) {
      // Create new user if not found
      user = new User({
        googleId: id,
        name: displayName,
        email: emails[0].value,
        password: null, // Password is not applicable for OAuth users
      });
      await user.save();
    }
    res.redirect('/profile');
    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Send token response (shared between normal and Google OAuth login)
const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res.cookie('token', token, {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true
    })
    .status(codeStatus)
    .json({
      success: true,
      role: user.role
    });
};

// Logout (No changes required)
exports.logout = (req, res, next) => {
  res.clearCookie('token', { httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logged out"
  });
};

// User Profile (No changes required)
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
