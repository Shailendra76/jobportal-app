
import axios from 'axios';
// import { toast } from 'react-toastify'
import {
   
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
 
    JOB_LOAD_SUCCESS,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    
    JOB_LOAD_SINGLE_SUCCESS,
    DELETE_JOB_FAIL,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,

    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
   
    REGISTER_JOB_SUCCESS,
    EDIT_JOB_FAIL,
    EDIT_JOB_REQUEST,
    EDIT_JOB_SUCCESS
   

  
} from "../constants/jobconstant"





export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}
// single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/job/${id}`);
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}
//delete single job action
export const deleteSingleJobAction = (job_id) => async (dispatch) => {
    dispatch({ type: DELETE_JOB_REQUEST });
    try {
        const { data } = await axios.delete(`/job/delete/${job_id}`);
        dispatch({
            type: DELETE_JOB_SUCCESS,
            payload: data
        });
        alert("Job deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_JOB_FAIL,
            payload: error.response.data.error
        });
        alert(error.response.data.error);
    }
}
export const registerAjobAction = (job) => async (dispatch) => {
    dispatch({ type: REGISTER_JOB_REQUEST })

    try {
        const { data } = await axios.post("/job/create", job)
        dispatch({
            type: REGISTER_JOB_SUCCESS,
            payload: data
        })
        alert("Job created successfully");

    } catch (error) {
        dispatch({
            type: REGISTER_JOB_FAIL,
            payload: error.response.data.error
        })
        alert(error.response.data.error);
    }
}

//edit single job action
export const editSingleJobAction = (job) => async (dispatch) => {
    dispatch({ type: EDIT_JOB_REQUEST });
    try {
        const { data } = await axios.put(`/job/update/${job._id}`, job);
        dispatch({
            type: EDIT_JOB_SUCCESS,
            payload: data
        });
        alert("Job updated successfully");
    } catch (error) {
        dispatch({
            type: EDIT_JOB_FAIL,
            payload: error.response.data.error
        });
        alert(error.response.data.error);
    }
}