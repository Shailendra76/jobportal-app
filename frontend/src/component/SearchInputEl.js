import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const validationSchema = yup.object({
    search: yup
        .string('Enter your search query')
        .required('This field cannot be empty'),
});

const SearchInputEl = () => {
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchSuggestions = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get('https://jobportal-app-1.onrender.com/jobs/show', {
                params: { query },
            });
            // Extract job titles from the response
            const jobTitles = response.data.jobTitles || [];
            const filteredTitles = jobTitles.filter(title => title.toLowerCase().includes(query.toLowerCase()));
            const sortedTitles = filteredTitles.sort((a, b) => a.localeCompare(b));
            setSuggestions(sortedTitles);
        } catch (err) {
            setError('Failed to fetch suggestions');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (values, actions) => {
        const { search } = values;
        if (search.trim()) {
            navigate(`/search/${search}`);
        } else {
            navigate('/');
        }
        actions.resetForm();
    };

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },
        validationSchema: validationSchema,
        onSubmit,
    });

    useEffect(() => {
        if (values.search.trim()) {
            fetchSuggestions(values.search);
        } else {
            setSuggestions([]);
        }
    }, [values.search]);

    const handleSuggestionClick = (suggestion) => {
        setFieldValue('search', suggestion);
        setSuggestions([]);
    };

    const handleClear = () => {
        setFieldValue('search', '');
        setSuggestions([]);
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    mt: -12, 
                    alignItems: 'center'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <InputBase
                        sx={{
                            bgcolor: 'lightblue',
                            padding: '10px',
                            color: 'rgba(0, 0, 0, 0.9)',
                            width: '100%',
                            maxWidth: { xs: '80%', sm: '75%', md: '100%' }, 
                        }}
                        id="search"
                        name="search"
                        placeholder="ex: developer, front end"
                        value={values.search}
                        onChange={(e) => {
                            handleChange(e);
                            // Optionally handle clearing suggestions if needed
                        }}
                        error={touched.search && Boolean(errors.search)}
                    />
                    <Button
                        sx={{
                            ml: 2, 
                        }}
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Search
                    </Button>
                    <Button
                        sx={{
                            position: 'absolute',
                            right: '70px',
                            top: '50%',
                            fontSize:'20px',
                            transform: 'translateY(-50%)',
                            color: 'rgba(0, 0, 0, 0.6)',
                        }}
                        onClick={handleClear}
                    >
                        X
                    </Button>
                </Box>
                <Box component="span" sx={{ color: 'orange', textAlign: 'center' }}>
                    {touched.search && errors.search}
                </Box>
                {error && (
                    <Box sx={{ color: 'red', textAlign: 'center' }}>
                        {error}
                    </Box>
                )}
               
                {suggestions.length > 0 && (
                    <List sx={{ maxHeight: '150px', overflowY: 'auto', width: '20%', bgcolor: 'white', border: '1px solid #ccc', mt: '0%', marginLeft: '50%', marginRight: '50%' }}>
                        {suggestions.map((suggestion, index) => (
                            <ListItem button key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                <ListItemText primary={suggestion} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </form>
    );
};

export default SearchInputEl;  