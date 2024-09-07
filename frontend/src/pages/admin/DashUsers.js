import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, Stack, Pagination } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { allUserAction } from '../../redux/actions/userAction';
import moment from 'moment';

const DashUsers = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Make sure this matches the backend pageSize

    useEffect(() => {
        dispatch(allUserAction(page, pageSize));
    }, [dispatch, page, pageSize]);

    const { users, loading, count } = useSelector(state => state.allUsers);

    let data = users || [];

    const deleteUserById = (e, id) => {
        console.log(id);
    };

    const columns = [
        { field: '_id', headerName: 'User ID', width: 150, editable: true },
        { field: 'email', headerName: 'E_mail', width: 150 },
        {
            field: 'role',
            headerName: 'User status',
            width: 150,
            renderCell: (params) => (params.row.role === 1 ? "Admin" : "Regular user")
        },
        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained">
                        <Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link>
                    </Button>
                    <Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">Delete</Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    All users
                </Typography>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                    <Button variant='contained' color="success" startIcon={<AddIcon />}>
                        Create user
                    </Button>
                </Box>
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{
                                '& .MuiTablePagination-displayedRows': { color: 'white' },
                                color: 'lightblue',
                                [`& .${gridClasses.row}`]: { bgcolor: (theme) => theme.palette.secondary.main }
                            }}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[5, 10, 15]} // Allow page size selection
                            pagination={false} // Disable DataGrid's built-in pagination
                            components={{ Toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>
                <Stack spacing={2} sx={{ mt: 3 }}>
                    <Pagination
                        color='secondary'
                        variant="outlined"
                        page={page}
                        count={Math.ceil(count / pageSize)} // Total number of pages
                        onChange={(event, value) => setPage(value)}
                    />
                </Stack>
            </Box>
        </>
    );
};

export default DashUsers;
