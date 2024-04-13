import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { AppBar, Box, Container, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Button, Tooltip } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon, Work as WorkIcon } from "@mui/icons-material";
import { userLogoutAction } from '../redux/actions/userAction';
import { toggleActionTheme } from '../redux/actions/themeAction';
import useMediaQuery from '@mui/material/useMediaQuery';


const pages = ['Home', 'Log In', 'Register'];

const Navbar = () => {
    //show / hide button
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

    // log out user
    const logOutUser = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }
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
            default:
                break;
        }
    };

    
    
    
    // Check if the screen size is less than or equal to 'md'
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <AppBar position="static" sx={{ bgcolor: palette.primary.main }}>
            <Container >
                <Toolbar disableGutters>
                    <WorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                            color: 'inherit',
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
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        JOB PORTAL
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {isMobile ? null : (
                            <>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    <Link to="/" style={{ color: 'white', textDecoration: "none" }}>
                                        Home
                                    </Link>
                                </Button>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    <Link to="/register" style={{ color: 'white', textDecoration: "none" }}>
                                        Register
                                    </Link>
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
                                <Avatar sx={{ color: palette.primary.white }} alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            PaperProps={{
                                sx: {
                                    "& 	.MuiMenu-list": {
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
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: palette.secondary.main }} to="/admin/dashboard">Admin Dashboard</Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: palette.secondary.main }} to="/user/dashboard">User Dashboard</Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: palette.secondary.main }} to="/forgotpassword">Forgot Password</Link></Typography>
                            </MenuItem>
                            {!userInfo ?
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"><Link style={{ textDecoration: "none", color: palette.secondary.main }} to="/login">Log In</Link></Typography>
                                </MenuItem> :
                                <MenuItem onClick={logOutUser}>
                                    <Typography style={{ textDecoration: "none", color: palette.secondary.main }} textAlign="center">Log Out</Typography>
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
