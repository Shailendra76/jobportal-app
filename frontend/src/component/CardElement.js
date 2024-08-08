import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const stylesArray = [
    { 
        minWidth: 275, mb: 3, mt: 3, 
        bgcolor: 'white', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    { 
        minWidth: 275, mb: 3, mt: 3, 
        bgcolor: 'lightblue', 
        border: 'none', 
        borderRadius: '16px', 
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s',
        '&:hover': {
            bgcolor: 'deepskyblue',
            transform: 'scale(1.05)'
        }
    },
    { 
        minWidth: 275, mb: 3, mt: 3, 
        bgcolor: 'lightyellow', 
        border: '2px solid #f0ad4e', 
        borderRadius: '4px', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    { 
        minWidth: 275, mb: 3, mt: 3, 
        bgcolor: 'lightgreen', 
        border: '1px solid #5cb85c', 
        borderRadius: '12px', 
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            borderColor: 'darkgreen',
            color: 'darkgreen',
            transform: 'scale(1.05)'
        }
    },
    { 
        minWidth: 275, mb: 3, mt: 3, 
        bgcolor: 'lightcoral', 
        border: '1px solid #d9534f', 
        borderRadius: '20px', 
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
       
        '&:hover': {
           transform: 'scale(1.05)'
        }
    },
    { 
        minWidth: 275, mb: 3, mt: 3, 
        bgcolor: 'lavender', 
        border: '2px dashed #9370db', 
        borderRadius: '10px', 
        boxShadow: '0 5px 10px rgba(147, 112, 219, 0.2)',
        '&:hover': {
            borderColor: '#8a2be2',
            boxShadow: '0 10px 20px rgba(138, 43, 226, 0.4)',
            transform: 'scale(1.05)'
        }
    },
    { 
        minWidth: 275, mb: 3, mt: 3, 
        bgcolor: 'peachpuff', 
        border: '2px dotted #ff6347', 
        borderRadius: '25px', 
        boxShadow: '0 4px 8px rgba(255, 99, 71, 0.2)',
        '&:hover': {
            boxShadow: '0 8px 16px rgba(255, 69, 0, 0.4)',
            transform: 'scale(1.05)'
        }
    },
    { 
        minWidth: 275, mb: 3, mt: 3, 
        bgcolor: 'mintcream', 
        border: '1px solid #3cb371', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(60, 179, 113, 0.2)',
        '&:hover': {
            borderColor: '#2e8b57',
            boxShadow: '0 8px 16px rgba(46, 139, 87, 0.4)',
            transform: 'scale(1.05)'
        }
    }
];

const capitalizeWords = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

const CardElement = ({ jobTitle, description, category, location, id }) => {
    const { palette } = useTheme();
    const [style, setStyle] = React.useState({});

    React.useEffect(() => {
        const randomStyle = stylesArray[Math.floor(Math.random() * stylesArray.length)];
        setStyle(randomStyle);
    }, []);

    return (
        <Card sx={{ ...style }}>
            <CardContent>
                <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }} gutterBottom>
                    <IconButton><LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} /></IconButton> {capitalizeWords(location)}
                </Typography>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: palette.primary.main }}>
                    {capitalizeWords(jobTitle)}
                </Typography>
                <Typography sx={{ mb: 1.5, fontSize: 16, color: palette.info.main, fontWeight: 600 }}>
                    {capitalizeWords(category)}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 14, color: palette.text.primary, lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 'bold', color: palette.primary.dark }}>Description:</span> {description ? capitalizeWords(description.split(" ").slice(0, 15).join(" ") + "...") : ""}
                </Typography>
            </CardContent>
            <CardActions>
                <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}>
                    <Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/job/${id}`}>More Details</Link>
                </Button>
            </CardActions>
        </Card>
    );
}

export default CardElement;
