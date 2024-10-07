import React from 'react';
import { Avatar, Box, Button, Typography, TextField } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock'; // Replaced with LockIcon for better visual appeal
import GoogleIcon from '@mui/icons-material/Google';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction';
import { Link } from 'react-router-dom';
import registerimg from '../images/register.jpg';
import {  useMediaQuery } from '@mui/material';
 // Detect screen size
const validationSchema = yup.object({
    firstName: yup
        .string('Enter your First Name')
        .min(3, 'First Name should be of minimum 3 characters length')
        .required('First Name is required'),
    lastName: yup
        .string('Enter your Last Name')
        .min(3, 'Last Name should be of minimum 3 characters length')
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Register = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
            actions.resetForm();
        }
    });

    const handleGoogleSignUp = () => {
        // Logic for Google Sign-Up
        window.location.href = '/auth/google'; // Example redirect, adjust based on your setup
    };
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Navbar />
            <Box
      sx={{
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'white',
        backgroundImage: isSmallScreen ? 'none' : `url(${registerimg})`,  // Remove background on small screens
        backgroundPositionX: 100,
        backgroundPositionY: -103,
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: '800px 800px',
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '66%', sm: '48%', md: '25%' },
          p: 4,
          bgcolor: 'white',
          borderRadius: 4,
          boxShadow: 5,
          overflow: 'hidden',
          position: 'relative',
          left: isSmallScreen ? '0' : '35%',  // Center form on small screens
          right: isSmallScreen ? '0' : '80%',  // Adjust form position
          border: '2px solid #d1c4e9',
        }}
      >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-35px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                           background:"transparent",
                            width: '80px', // Increased size
                            height: '109px', // Increased size
                           
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        
                        }}
                    >
                        <Avatar sx={{ width: 65, height: 60, bgcolor: "transparent" }}>
                            <LockIcon sx={{ color: 'black', fontSize: 24 }} /> {/* Changed icon and size */}
                        </Avatar>
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#7b1fa2' }}>
                        Create an Account
                    </Typography>
                    <TextField
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                               
                                color: '#4a148c',
                            },
                            "& .MuiFormLabel-root": {
                                color: '#000000',
                            },
                            fieldset: { borderColor: "#ab47bc" },
                            borderRadius: 1
                        }}
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name='firstName'
                        placeholder="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                                color: '#4a148c',
                            },
                            "& .MuiFormLabel-root": {
                                color: '#000000',
                            },
                            fieldset: { borderColor: "#ab47bc" },
                            borderRadius: 1
                        }}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name='lastName'
                        placeholder="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        sx={{
                            mb: 2,
                            "& .MuiInputBase-root": {
                                color: '#4a148c',
                            },
                            "& .MuiFormLabel-root": {
                                color: '#000000',
                            },
                            fieldset: { borderColor: "#ab47bc" },
                            borderRadius: 1
                        }}
                        fullWidth
                        id="email"
                        label="E-mail"
                        name='email'
                        placeholder="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        sx={{
                            mb: 3,
                            "& .MuiInputBase-root": {
                                color: '#4a148c',
                            },
                            "& .MuiFormLabel-root": {
                                color: '#000000',
                            },
                            fieldset: { borderColor: "#ab47bc" },
                            borderRadius: 1
                        }}
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        sx={{
                            mb: 2,
                            width: '100%',
                            borderRadius: 4,
                            textTransform: 'none',
                            bgcolor: '#7b1fa2',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#ab47bc'
                            }
                        }}
                        variant="contained"
                        type='submit'
                    >
                        Register
                    </Button>
                    <Button
                        onClick={handleGoogleSignUp}
                        sx={{
                            width: '100%',
                            borderRadius: 4,
                            textTransform: 'none',
                            bgcolor: '#db4437',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#c1351d'
                            }
                        }}
                        variant="contained"
                        startIcon={<GoogleIcon />}
                    >
                        Sign up with Google
                    </Button>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Register;
