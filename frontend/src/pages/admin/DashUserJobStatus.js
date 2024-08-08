
import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import { profileAction } from '../../redux/actions/jobstatusAction';

const DashUserJobStatus = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileAction());
    }, []);


    const { app, loading } = useSelector(state => state.apps);
    let data = [];
    data = (app !== undefined && app.length > 0) ? app : []

    const deleteUserById = (e, id) => {
        console.log(id);
    }

    const columns = [

        {
            field: '_id',
            headerName: 'Application id',
            width: 150,
            editable: true,
        },

        {
            field: 'user',
            headerName: 'user id',
            width: 150,
        },
        {
            field: 'applicationStatus',
            headerName: 'Application status',
            width: 150,
        },

       

        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                   
                </Typography>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                    <Button variant='contained' color="success" startIcon={<AddIcon />}> Create user</Button>
                </Box>
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{

                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                },
                                color: 'lightblue',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) =>
                                        // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                        theme.palette.secondary.main
                                },
                                button: {
                                    color: '#ffffff'
                                }

                            }}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>

            </Box>
        </>
    )
}

export default DashUserJobStatus
