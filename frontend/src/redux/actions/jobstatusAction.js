

import axios from 'axios';
import { toast } from "react-toastify";

import { USER_JOB_STATUS_FAIL, USER_JOB_STATUS_REQUEST, USER_JOB_STATUS_SUCCESS } from '../constants/jobstatusconstant';
const base_url="https://jobportal-app-1.onrender.com"
export const profileAction = () => async (dispatch) => {
    dispatch({ type: USER_JOB_STATUS_REQUEST });
    try {
        const { data } = await axios.get(`${base_url}/profile`);
        dispatch({
            type: USER_JOB_STATUS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_JOB_STATUS_FAIL,
            payload: error.response.data.error
        });
    }
}