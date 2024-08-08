
// import { createTheme } from '@mui/material/styles';
import { blue, grey, lightBlue } from '@mui/material/colors';

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: blue[500]
//         },
//         secondary: {
//             main: lightBlue[800],
//             midNightBlue: "#003366"
//         }
//     }
// });

export const themeColors = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: blue[500],
                    white: "#fff",
                    foo:"black",
                    foo1:"#0f171e",
                    card:"#fff",
                    sing:"#fff",
                    filt:"#fff"
                },
                secondary: {
                    main: lightBlue[800],
                    midNightBlue: "#003366"

                },
               
            }
            : {
                // palette values for dark mode
                primary: {
                     filt:"#fff",
                    main: "#003366",
                    white: "#003366",
                    foo:"#fff",
                    card:"rgb(59 60 68 / 87%)",
                    sing:"#0f171e"
                },
                secondary: {
                    main: blue[500],
                    midNightBlue: "#2196f3"
                },
                background: {
                    default: "#0f171e"
                },
                text: {
                    primary: '#000',
                    secondary: grey[500],
                },
            }),
    },
});
