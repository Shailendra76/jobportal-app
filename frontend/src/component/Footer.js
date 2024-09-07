
import { Box, Divider, IconButton, Stack } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const navigateTo = (url) => {
        window.location.href = url;
    };
    
    

    return (
        

        <>
            <Divider sx={{ borderTop: '1px solid black' }} />
            <Box sx={{
   
    display: 'flex',
    
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '30px 0', // Added padding at the top and bottom
}}>
    <Box component='span' sx={{ color: palette.primary.foo ,fontSize: '1.5rem', fontWeight: 'bold', zIndex: 1, mb: 2 }}>
        Job Portal {/* Added mb: 2 for margin bottom */}
    </Box>
    <Stack direction="row" spacing={2} sx={{ 
        color: 'black',
        
        width: '100%',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        mb: 2 }}
        >
        <IconButton onClick={() => navigateTo('https://www.instagram.com/sk_465_465/')}>
            <InstagramIcon />
        </IconButton>
        <IconButton onClick={() => navigateTo('https://www.youtube.com/@varma9197')}>
            <YouTubeIcon />
        </IconButton>
        <IconButton onClick={() => navigateTo('https://www.facebook.com/shailendra.varma.3532507')}>
            <FacebookIcon />
        </IconButton>
        <IconButton onClick={() => navigateTo(' https://in.linkedin.com/in/naman-kumar-dubey-963792223')}>
            <TwitterIcon />
        </IconButton>
    </Stack>
   
    <Box
    component='span'
    sx={{
        color: 'black',
        backgroundColor: '#addafd',
        mt: 2,
        mb: -18,
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}
>
    @All rights reserved! 2024.
</Box>

</Box>

</>
    );
};

export default Footer;
