import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { AppBar, Box, Container, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Button, Tooltip } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from "@mui/icons-material";
import { userLogoutAction } from '../redux/actions/userAction';
import { toggleActionTheme } from '../redux/actions/themeAction';
import useMediaQuery from '@mui/material/useMediaQuery';
import homeIcon from '../images/home.png';
import registerIcon from '../images/register1.png';
import accountIcon from '../images/account.png';
import './styles.css';

const Navbar = () => {
    const { userInfo } = useSelector(state => state.signIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

   
    const handlePageClick = (page) => {
        switch (page) {
            case 'Home':
                navigate('/');
                break;
            case 'Log In':
                navigate('/login');
                break;
            case 'Register':
                navigate('/register');
                break;
            case 'Log Out':
                navigate('/logout');
                break;
            default:
                break;
        }
    };

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }

    return (
        <AppBar position="sticky" sx={{ bgcolor:'#a491a7',height:'70px',paddingTop:'1px'}}>
            <Container>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        JOB PORTAL
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {['Home', 'Log In', 'Register'].map((page) => (
                                <MenuItem  sx = {{ color:palette.secondary.filt1 }} key={page} onClick={() => handlePageClick(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {!isMobile && (
                            <>
                                <Button sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }} onClick={() => handlePageClick('Home')}>
                                    <img src={homeIcon} alt="Home Icon" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                    <Typography sx = {{ color:palette.secondary.filt1 }} class="quicksand-custom">Home</Typography>
                                </Button>

                                <Button sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }} onClick={() => handlePageClick('Register')}>
                                    <img src={registerIcon} alt="Register Icon" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                    <Typography sx = {{ color:palette.secondary.filt1 }} class="quicksand-custom">Register</Typography>
                                </Button>
                            </>
                        )}
                    </Box>

                    <IconButton sx={{ mr: 4 }} onClick={() => dispatch(toggleActionTheme())}>
                        {palette.mode === "dark" ? (
                            <DarkMode sx={{ color: "#ffffff", fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: "#ffffff", fontSize: "25px" }} />
                        )}
                    </IconButton>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <img src={accountIcon} alt="Home Icon" style={{ width: '28px', height: '28px', marginRight: '8px' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            PaperProps={{
                                sx: {
                                    "& .MuiMenu-list": {
                                        bgcolor: "primary.white",
                                        color: "white"
                                    },
                                }
                            }}
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none",fontWeight: 'bold', color: palette.secondary.filt1 }} to="/admin/dashboard">Admin Dashboard</Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none",fontWeight: 'bold', color: palette.secondary.filt1 }} to="/user/dashboard">User Dashboard</Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none",fontWeight: 'bold', color: palette.secondary.filt1 }} to="/forgotpassword">Forgot Password</Link></Typography>
                            </MenuItem>
                            {!userInfo ?
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"><Link style={{ textDecoration: "none",fontWeight: 'bold', color: palette.secondary.filt1 }} to="/login">Log In</Link></Typography>
                                </MenuItem> :
                                <MenuItem onClick={logOut}>
                                    <Typography textAlign="center"><Link style={{ textDecoration: "none",fontWeight: 'bold', color: palette.secondary.filt1 }} >Log Out</Link></Typography>
                                </MenuItem>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
