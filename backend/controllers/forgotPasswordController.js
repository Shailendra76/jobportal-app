// controllers/auth.js

const User = require('../models/userModels');
const OTP = require('../models/OTP');
const { sendOTP } = require('../utils/sendOTP');
const bcrypt = require("bcryptjs");



// controllers/auth.js



// Forgot password - Send OTP
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.findOneAndDelete({ email });
    
    const newOTP = new OTP({ email, otp });
    await newOTP.save();

    // Send OTP via email or SMS
    sendOTP(email, otp);

    return res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  console.log(req.body);
  try {
    const existingOTP = await OTP.findOne({ email });
    console.log(existingOTP);

    if (!existingOTP || existingOTP.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
   
    // Assuming User is your Mongoose model for users
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    await OTP.findOneAndDelete({ email });

    return res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
