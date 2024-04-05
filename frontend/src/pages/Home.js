
import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import { Box, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { jobLoadAction } from '../redux/actions/jobAction'
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction'
import { Link,useParams } from 'react-router-dom'
import SelectComponent from '../component/SelectComponent'
import CardElement from '../component/CardElement'
import Footer from '../component/Footer'
import LoadingBox from '../component/LoadingBox'
import LocationOnIcon from '@mui/icons-material/LocationOn'



const Home = () => {
    
const {jobs, setUniqueLocation, pages, loading} = useSelector(state=>state.loadJobs);
   const {palette}= useTheme();
   const [page, setPage] = useState(1);
   const{keyword,location} = useParams();
   const [cat,setCat] = React.useState('');
   const dispatch = useDispatch();
   useEffect(()=>{
       dispatch(jobLoadAction(page, keyword , cat , location ));
   },[page, keyword , cat , location,dispatch]);
   useEffect(()=>{
       dispatch(jobTypeLoadAction( ));
   },[dispatch]);
   const handleChangeCategory = (e) => {
    const selectedCategory = e.target.value;
    setCat(selectedCategory);
    setPage(1); // Reset page to 1 when a new category is selected
}
    return (
        <>
            <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>

                <Navbar />
                <Header />
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <Box sx={{ flex: 2, p: 2 }}>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by category
                                    </Typography>

                                   

                                </Box>
                               
                             <SelectComponent handleChangeCategory ={handleChangeCategory} cat ={cat}/>
                             
                            </Card>

                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    {/* <h4>Filter by category</h4> */}
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by location
                                    </Typography>
                                    <MenuList>
                                        {
                                            setUniqueLocation && setUniqueLocation.map((location, i) => (
                                                <MenuItem key={i}>
                                                    <ListItemIcon>
                                                        <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                                                    </ListItemIcon>
                                                    <Link style={{ color: palette.secondary.main }} to={`/search/location/${location}`}>{location}</Link>
                                                </MenuItem>

                                            ))
                                        }

                                    </MenuList>

                                </Box>
                            </Card>
                            
                        </Box>
                        <Box sx={{ flex: 5, p: 2 }}>
                         {   
                             loading ?
                             <LoadingBox /> :
                             jobs && jobs.length === 0 ?
                             <>
                             <Box
                                                sx={{
                                                    minHeight: '350px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>

                                                <h2>No result found!</h2>
                                            </Box>
                                        </> :
                            jobs && jobs.map((job,i) => (
                                <CardElement
                                key={i}
                                id={job._id}
                                jobTitle={job.title}
                                description={job.description}
                                category={job.jobType ? job.jobType.jobTypeName : "No category"}
                                location={job.location}
                                />
                            ))
                         }
                          <Stack spacing={2} >
                                <Pagination color="primary" variant="outlined" page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
                            </Stack>
                        </Box>
                </Stack>
            </Container>
            </Box>
            <Footer/>

        </>
              )
}

export default Home
