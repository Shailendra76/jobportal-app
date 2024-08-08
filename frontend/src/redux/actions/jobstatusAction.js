

import axios from 'axios';
import { toast } from "react-toastify";

import { USER_JOB_STATUS_FAIL, USER_JOB_STATUS_REQUEST, USER_JOB_STATUS_SUCCESS } from '../constants/jobstatusconstant';
export const profileAction = () => async (dispatch) => {
    dispatch({ type: USER_JOB_STATUS_REQUEST });
    try {
        const { data } = await axios.get(`/profile`);
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