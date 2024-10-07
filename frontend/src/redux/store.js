import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { deleteJobReducer, loadJobReducer, loadJobSingleReducer, registerAjobReducer, updateJobReducer } from './reducers/jobReducer';
import { createJobTypeReducer, loadJobTypeReducer } from './reducers/jobTypeReducer';

import { allUserReducer, userApplyJobReducer, userReducerForgotPassword, userReducerLogout, userReducerProfile, userReducerResetPassword, userReducerSignIn, userReducerSignUp } from './reducers/userReducer';
import { modeReducer } from './reducers/themeModeReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' 
  ? composeWithDevTools 
  : compose;  // Use `compose` in production or if DevTools aren't available

const reducer = combineReducers({
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    singleJob: loadJobSingleReducer,
    userJobApplication: userApplyJobReducer,
    allUsers: allUserReducer,
    registerJob: registerAjobReducer,
    deleteJob: deleteJobReducer,
    createJobType: createJobTypeReducer,
    updateJob: updateJobReducer,
    signUp: userReducerSignUp,
    mode: modeReducer,
    forgotPassword: userReducerForgotPassword,
    resetPassword: userReducerResetPassword
});

let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') 
            ? JSON.parse(localStorage.getItem('userInfo')) 
            : null
    },
    mode: {
        mode: "light"
    }
};

const middleware = [thunk];

// Combine enhancers and middleware
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancers(applyMiddleware(...middleware))  // Use composeEnhancers correctly
);

export default store;
