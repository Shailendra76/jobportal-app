import { Avatar, Box, TextField, Button } from '@mui/material';
import React, { useEffect } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
// import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignInAction } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import loginlogo from '../images/user.png'
const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);

    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
    }, [isAuthenticated, navigate, userInfo]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignInAction(values));
            actions.resetForm();
        }
    });

    return (
        <>
            <Navbar />
            <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#080710', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
                {/* Background shapes */}
                <Box sx={{
                    position: 'absolute', width: 200, height: 200, borderRadius: '50%',
                    background: 'linear-gradient(#1845ad, #23a2f6)', top: '-50px', left: '-80px'
                }}></Box>
                <Box sx={{
                    position: 'absolute', width: 200, height: 200, borderRadius: '50%',
                    background: 'linear-gradient(to right, #ff512f, #f09819)', bottom: '-50px', right: '-80px'
                }}></Box>

                {/* Login Form */}
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{
                        position: 'relative',
                        width: 400,
                        bgcolor: 'rgba(255, 255, 255, 0.13)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        p: 5,
                        border: '2px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 0 40px rgba(8,7,16,0.6)',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <Avatar sx={{ m: '0 auto', bgcolor: 'primary.main', mb: 3 }}>
                    <img src={loginlogo} alt="Login Logo" style={{ width: '100%', height: '100%' }} />
                    </Avatar>
                    <TextField
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        InputLabelProps={{ shrink: true }}
                        placeholder="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{
                            mb: 3,
                            input: { color: '#e5e5e5' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                            },
                            '& .MuiInputLabel-root': { color: '#e5e5e5' },
                            bgcolor: 'rgba(255,255,255,0.07)',
                        }}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        sx={{
                            mb: 3,
                            input: { color: '#e5e5e5' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                            },
                            '& .MuiInputLabel-root': { color: '#e5e5e5' },
                            bgcolor: 'rgba(255,255,255,0.07)',
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            bgcolor: '#fff',
                            color: '#080710',
                            ':hover': { bgcolor: '#f1f1f1' },
                            fontWeight: 600,
                            padding: '15px 0'
                        }}
                    >
                        Log In
                    </Button>

                    {/* Optional Social Login (similar to original design) */}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.27)',
                                color: '#eaf0fb',
                                ':hover': { bgcolor: 'rgba(255,255,255,0.47)' },
                            }}
                            startIcon={<i className="fab fa-google" />}
                        >
                            Google
                        </Button>
                        <Button
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.27)',
                                color: '#eaf0fb',
                                ':hover': { bgcolor: 'rgba(255,255,255,0.47)' },
                            }}
                            startIcon={<i className="fab fa-facebook" />}
                        >
                            Facebook
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default LogIn;
