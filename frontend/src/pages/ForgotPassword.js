// ForgotPassword.js
import React from 'react';
import { Avatar } from '@mui/material'
import { Box, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userForgotPasswordAction } from '../redux/actions/userAction';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
  });
  
  const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        await dispatch(userForgotPasswordAction(values));
        navigate('/resetpassword');
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
  
  export default ForgotPassword;
  