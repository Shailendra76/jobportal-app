import { USER_JOB_STATUS_FAIL, USER_JOB_STATUS_REQUEST, USER_JOB_STATUS_RESET, USER_JOB_STATUS_SUCCESS } from "../constants/jobstatusconstant"

export const profilereducer = (state = { app: [] }, action) => {
    switch (action.type) {
        case USER_JOB_STATUS_REQUEST:
            return { loading: true, app: [] }
        case USER_JOB_STATUS_SUCCESS:
            return {
                loading: false,
                users: action.payload.app,
            }
        case USER_JOB_STATUS_FAIL:
            return { loading: false, app: [], error: action.payload }
        case USER_JOB_STATUS_RESET:
            return {}
        default:
            return state;
    }

}