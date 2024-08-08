// utils/sendOTP.js

const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vsk60419@gmail.com', // Your email address
      pass: 'kmcscndezmfvmsbw' // Your email password
    },
  });

  // Setup email data
  let mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'OTP for Password Reset',
    text: `Your OTP for password reset is ${otp}. Please do not share it with anyone.`,
  };

  // Send mail with defined transport object
  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };
