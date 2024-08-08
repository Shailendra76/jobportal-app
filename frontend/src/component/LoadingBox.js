import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingBox = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '350px',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                p: 2
            }}
        >
            {/* Circular Progress Indicator */}
            <CircularProgress size={60} sx={{ mb: 2 }} />

            {/* Loading Text */}
            <Typography variant="h6" component="div" sx={{ color: 'text.secondary', mt: 2 }}>
                Loading jobs, please wait...
            </Typography>
        </Box>
    );
};

export default LoadingBox;
