import styled from '@emotion/styled'
import { Box } from '@mui/system'
import React from 'react'
import headerImage from '../images/jobbg.jpg'
import SearchInputEl from './SearchInputEl'


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
            alignItems:'center',
            backgroundImage:`url(${headerImage})`,
            backgroundSize:"cover",
            backgroundPosition:"center center",
            backgroundColor:theme.palette.secondary.main,
            '@media (max-width: 768px)': {
                minHeight: 200,
                backgroundSize: "cover"
            }
        
        }
        ));
    return (
        <>
            <StyledHeader>
             <SearchInputEl/>
            </StyledHeader>
        </>
    )
}

export default Header
