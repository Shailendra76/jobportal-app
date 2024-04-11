import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { deleteJobReducer, loadJobReducer, loadJobSingleReducer, registerAjobReducer, updateJobReducer } from './reducers/jobReducer';
import { createJobTypeReducer, loadJobTypeReducer } from './reducers/jobTypeReducer';


import { allUserReducer, userApplyJobReducer, userReducerForgotPassword, userReducerLogout, userReducerProfile, userReducerResetPassword, userReducerSignIn, userReducerSignUp } from './reducers/userReducer';
//import { THEME_MODE } from './constants/themeConstant';
import { modeReducer } from './reducers/themeModeReducer';



const reducer = combineReducers({
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn:userReducerSignIn,
    logOut:userReducerLogout,
    userProfile:userReducerProfile,
    singleJob:loadJobSingleReducer,
    userJobApplication:userApplyJobReducer,
    allUsers:allUserReducer,
    registerJob: registerAjobReducer,
    deleteJob: deleteJobReducer,
    createJobType: createJobTypeReducer,
    updateJob: updateJobReducer,
    signUp: userReducerSignUp,
    mode: modeReducer,
    forgotPassword:userReducerForgotPassword,
    resetPassword:userReducerResetPassword

});
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    mode: {
        mode: "light"
    }
};
const middleware =[thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;

