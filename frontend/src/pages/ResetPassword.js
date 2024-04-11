// Import statements
import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userResetPasswordAction } from '../redux/actions/userAction';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Validation schema
const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  otp: yup.string().required('OTP is required'),
  newPassword: yup.string().required('New password is required'),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(userResetPasswordAction(values));
      navigate('/');
    },
  });

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: 'calc(100vh - 140px)', display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "primary.white" }}>
        <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LockClockOutlined sx={{ color: 'white' }} />
            </Avatar>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="otp"
              name="otp"
              label="OTP"
              type="text"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
            <TextField
              fullWidth
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
            <Button fullWidth variant="contained" type="submit">
              Reset Password
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ResetPassword;
