import styled from '@emotion/styled'
import { Box } from '@mui/system'
import React from 'react'
import headerImage from '../images/jobbg.jpg'


// Define the styled component outside the functional component
// const StyledHeader = styled(Box)(({theme})=>(
// {
//     display:"flex",
//     justifyContent:"center",
//     minHeight:400,
//     backgroundImage:`url(${headerImage}))`,
//     backgroundSize:"cover",
//     backgroundPosition:"center",
//     backgroundColor:"lightblue"

// }
// ));

const Header = () => {
    const StyledHeader = styled(Box)(({theme})=>(
        {
            display:"flex",
            justifyContent:"center",
            minHeight:400,
            backgroundImage:`url(${headerImage})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            backgroundColor:theme.palette.secondary.main
        
        }
        ));
    return (
        <>
            <StyledHeader>

            </StyledHeader>
        </>
    )
}

export default Header
