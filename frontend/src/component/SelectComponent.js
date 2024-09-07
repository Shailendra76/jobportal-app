import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction';

const SelectComponent = ({ handleChangeCategory, cat }) => {
    const { jobType } = useSelector(state => state.jobTypeAll);
    const { palette } = useTheme();
    const dispatch = useDispatch();

    React.useEffect(() => {
        // Load job types when the component mounts
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    inputProps={{
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    backgroundColor: palette.secondary.filt
                                }
                            }
                        }
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cat}
                    label="Category"
                    onChange={handleChangeCategory}
                >
                   <MenuItem 
                        value="" 
                        sx={{ 
                           // Change background color
                            color: palette.secondary.filt1 // Change text color
                        }}
                    >
                        All</MenuItem>
                    {jobType && jobType.map(jt => (
                        <MenuItem   sx={{ 
                            // Change background color
                             color: palette.secondary.filt1 // Change text color
                         }} key={jt._id} value={jt._id}>{jt.jobTypeName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectComponent;
