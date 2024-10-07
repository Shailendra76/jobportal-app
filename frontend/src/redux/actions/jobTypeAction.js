
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { JOB_TYPE_LOAD_FAIL,
JOB_TYPE_LOAD_REQUEST,
JOB_TYPE_LOAD_SUCCESS ,
CREATE_JOB_TYPE_FAIL,
CREATE_JOB_TYPE_REQUEST,

CREATE_JOB_TYPE_SUCCESS} from '../constants/jobTypeConstant';



 const base_url="https://jobportal-app-1.onrender.com"

export const jobTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${base_url}/type/jobs`);
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}
// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_TYPE_REQUEST })

    try {
        const { data } = await axios.post(`${base_url}/type/create`, jobtype)
        dispatch({
            type: CREATE_JOB_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Job type created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: '🚀' // Customize the icon or remove it by setting icon to false
      });


    } catch (error) {
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        })
        alert(error.response.data.error);

    }
}