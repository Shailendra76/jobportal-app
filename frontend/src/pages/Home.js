import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import Header from '../component/Header';
import { Box, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, IconButton } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../redux/actions/jobAction';
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction';
import { Link, useParams } from 'react-router-dom';
import SelectComponent from '../component/SelectComponent';
import CardElement from '../component/CardElement';
import Footer from '../component/Footer';
import LoadingBox from '../component/LoadingBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Home = () => {
    const { jobs, setUniqueLocation, pages, loading } = useSelector(state => state.loadJobs);
    const { palette } = useTheme();
    const [page, setPage] = useState(1);
    const { keyword, location } = useParams();
    const [cat, setCat] = React.useState('');
    const [expandLocation, setExpandLocation] = useState(false); // State for expandable location filter
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobLoadAction(page, keyword, cat, location));
    }, [page, keyword, cat, location, dispatch]);

    useEffect(() => {
        dispatch(jobTypeLoadAction(page, keyword, cat, location));
    }, [page, keyword, cat, location, dispatch]);

    const handleChangeCategory = (e) => {
        const selectedCategory = e.target.value;
        setCat(selectedCategory);
        setPage(1); // Reset page to 1 when a new category is selected
    };

    const handleExpandLocation = () => {
        setExpandLocation(!expandLocation); // Toggle expand/collapse
    };

    return (
        <>
            <Box sx={{ bgcolor: palette.primary.card, minHeight: "100vh" }}>
                <Navbar />
                <Header />

                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{ mb: 3, mt: 3 }}
                    >
                        {/* Filter by category */}
                        <Card sx={{ flex: 1, p: 2, bgcolor: palette.secondary.filt, maxHeight: 300, overflow: 'auto' }}>
                            <Box sx={{ pb: 2 }}>
                                <Typography component="h4" sx={{ color: palette.secondary.filt1, fontWeight: 600 }}>
                                    Filter job by category
                                </Typography>
                            </Box>
                            <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />
                        </Card>

                        {/* Filter by location */}
                        <Card sx={{ flex: 1, p: 2, bgcolor: palette.secondary.filt, maxHeight: 300, overflow: 'auto' }}>
                            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography component="h4" sx={{ color: palette.secondary.filt1, fontWeight: 600 }}>
                                    Filter job by location
                                </Typography>
                                <IconButton onClick={handleExpandLocation}>
                                    {expandLocation ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>
                            {expandLocation && (
                                <MenuList>
                                    {
                                        setUniqueLocation && setUniqueLocation.map((loc, i) => (
                                            <MenuItem key={i}>
                                                <ListItemIcon>
                                                    <LocationOnIcon sx={{ color: palette.secondary.filt1, fontSize: 18 }} />
                                                </ListItemIcon>
                                                <Link style={{ color: palette.secondary.filt1 }} to={`/search/location/${loc}`}>{loc}</Link>
                                            </MenuItem>
                                        ))
                                    }
                                </MenuList>
                            )}
                        </Card>
                    </Stack>

                    {loading ? (
                        <LoadingBox>
                            <Typography variant="h6" sx={{ color: palette.primary.main, fontWeight: 'bold' }}>
                                Loading...
                            </Typography>
                            <Typography variant="body1" sx={{ color: palette.secondary.main }}>
                                Please wait while we fetch the jobs for you.
                            </Typography>
                        </LoadingBox>
                    ) : jobs && jobs.length === 0 ? (
                        <Box
                            sx={{
                                minHeight: '350px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <h2>No result found!</h2>
                        </Box>
                    ) : (
                        jobs && jobs.map((job, i) => (
                            <CardElement
                                key={i}
                                id={job._id}
                                jobTitle={job.title}
                                description={job.description}
                                category={job.jobType ? job.jobType.jobTypeName : "No category"}
                                location={job.location}
                            />
                        ))
                    )}

                    <Stack spacing={2} sx={{ mt: 3 }}>
                        <Pagination
                            color='secondary'
                            variant="outlined"
                            page={page}
                            count={pages === 0 ? 1 : pages}
                            onChange={(event, value) => setPage(value)}
                        />
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Home;
