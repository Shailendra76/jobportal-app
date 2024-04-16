import styled from '@emotion/styled';
import { Box } from '@mui/system';
import React from 'react';
import headerImageLight from '../images/bg2.jpg';
import headerImageDark from '../images/bg1.jpg';
import SearchInputEl from './SearchInputEl';
import { useTheme } from '@emotion/react';

// StyledHeader component for light mode
const StyledHeaderLight = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    minHeight: 400,
    alignItems: 'center',
    backgroundImage: `url(${headerImageLight})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundColor: 'lightblue', // Default background color for light mode
    '@media (max-width: 768px)': {
        minHeight: 200,
        backgroundSize: "cover"
    }
}));

// StyledHeader component for dark mode
const StyledHeaderDark = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    minHeight: 400,
    alignItems: 'center',
    backgroundImage: `url(${headerImageDark})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundColor: theme.palette.grey[900], // Default background color for dark mode
    '@media (max-width: 768px)': {
        minHeight: 200,
        backgroundSize: "cover"
    }
}));

const Header = () => {
    const theme = useTheme(); // Access the current theme
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <>
            {isDarkMode ? (
                <StyledHeaderDark>
                    <SearchInputEl />
                </StyledHeaderDark>
            ) : (
                <StyledHeaderLight>
                    <SearchInputEl />
                </StyledHeaderLight>
            )}
        </>
    );
};

export default Header;
