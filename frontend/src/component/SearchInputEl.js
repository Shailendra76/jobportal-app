import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    search: yup
        .string('Enter your search query')
        .required('This field cannot be empty'),
});

const SearchInputEl = () => {
    const navigate = useNavigate();

    const onSubmit = (values, actions) => {
        const { search } = values;
        if (search.trim()) {
            navigate(`/search/${search}`);
        } else {
            navigate('/');
        }
        actions.resetForm();
    };

    const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },
        validationSchema: validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt: -12, // Adjusted margin
                    px: 2, // Add padding for better mobile view
                }}
            >
                <InputBase
                    sx={{
                        bgcolor: 'lightblue',
                        padding: '10px',
                        color: 'rgba(0, 0, 0, 0.9)',
                        width: '100%',
                        maxWidth: { xs: '80%', sm: '75%', md: '50%' }, // Responsive width
                    }}
                    id="search"
                    name="search"
                    placeholder="ex: developer, front end"
                    value={values.search}
                    onChange={handleChange}
                    error={touched.search && Boolean(errors.search)}
                />
                <Button
                    sx={{
                        ml: 2, // Add some space between input and button
                    }}
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Search
                </Button>
            </Box>
            <Box component="span" sx={{ color: 'orange', textAlign: 'center' }}>
                {touched.search && errors.search}
            </Box>
        </form>
    );
};

export default SearchInputEl;
