import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, Stack, Pagination } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleJobAction, jobLoadAction } from '../../redux/actions/jobAction';

const DashJobs = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        dispatch(jobLoadAction(page, pageSize));
    }, [dispatch, page, pageSize]);

    const { success: deleteSuccess } = useSelector(state => state.deleteJob || {});
    const { jobs, loading, count, pages } = useSelector(state => state.loadJobs);

    let data = jobs || [];

    // Delete a job by id
    const deleteJobById = (e, id) => {
        if (window.confirm(`You really want to delete job ID: "${id}"?`)) {
            dispatch(deleteSingleJobAction(id));
            if (deleteSuccess) {
                dispatch(jobLoadAction(page, pageSize)); // Reload jobs after deletion
            }
        }
    };

    const columns = [
        { field: '_id', headerName: 'Job ID', width: 150, editable: true },
        { field: 'title', headerName: 'Job name', width: 150 },
        { field: 'jobType', headerName: 'Category', width: 150, valueGetter: (data) => data.row?.jobType?.jobTypeName },
        { field: 'user', headerName: 'User', width: 150, valueGetter: (data) => data.row?.User?.firstName },
        { field: 'available', headerName: 'Available', width: 150, renderCell: (values) => (values.row.available ? "Yes" : "No") },
        { field: 'salary', headerName: 'Salary', type: Number, width: 150, renderCell: (values) => "$" + values.row.salary },
        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained">
                        <Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/job/${values.row._id}`}>Edit</Link>
                    </Button>
                    <Button onClick={(e) => deleteJobById(e, values.row._id)} variant="contained" color="error">Delete</Button>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Jobs List
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}>
                    <Link style={{ color: "white", textDecoration: "none" }} to="/admin/job/create">Create Job</Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': { color: 'white' },
                            color: 'lightblue',
                            [`& .${gridClasses.row}`]: { bgcolor: (theme) => theme.palette.secondary.main }
                        }}
                        rows={data}
                        columns={columns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5]}
                        pagination={false} // Disable DataGrid's built-in pagination
                        loading={loading}
                    />
                </Box>
            </Paper>
            <Stack spacing={2} sx={{ mt: 3 }}>
                <Pagination
                    color='secondary'
                    variant="outlined"
                    page={page}
                    count={pages === 0 ? 1 : pages}
                    onChange={(event, value) => setPage(value)}
                />
            </Stack>
        </Box>
    );
}

export default DashJobs;
