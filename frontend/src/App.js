import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {CssBaseline,ThemeProvider} from '@mui/material';
import {ToastContainer} from 'react-toastify';
import { ProSidebarProvider } from 'react-pro-sidebar';
//import { theme } from './theme';
import LogIn from './pages/LogIn';
import UserDashboard from './pages/user/UserDashboard';
import UserRoute from './component/UserRoute';
import Layout from './pages/global/Layout';
import UserJobsHistory from './pages/user/UserJobsHistory';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './component/AdminRoute';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/admin/DashUsers';
import DashJobs from './pages/admin/DashJobs';
import DashCreateJob from './pages/admin/DashCreateJob';
import DashEditJob from './pages/admin/DashEditJob';
import DashCreateCategory from './pages/admin/DashCreateCategory';
import DashCategory from './pages/admin/DashCategory';
import Register from './pages/Register';
import { createTheme } from '@mui/material/styles';
import { themeColors } from './theme'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCreateJobHOC = Layout(DashCreateJob);
const DashAdminEditJobHOC = Layout(DashEditJob);
const DashCreateCategoryHOC = Layout(DashCreateCategory);
const DashCategoryHOC = Layout(DashCategory);





const App = () => {
    const { mode } = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeColors(mode)), [mode]);
    return (
        <>
     <ToastContainer/>
        <ThemeProvider theme={theme}> 
            <CssBaseline/>
            <ProSidebarProvider>
                 
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search/location/:location' element={<Home />} />
                    <Route path='/search/:keyword' element={<Home />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/forgotpassword' element={<ForgotPassword />} />
                    <Route path='/resetpassword' element={<ResetPassword />} />
                    <Route path='/register' element={<Register />} />

                    <Route path='/job/:id' element={<SingleJob/>} />
                    <Route path='/user/dashboard' element={<UserRoute><UserDashboardHOC /></UserRoute>} />
                    <Route path='/user/jobs' element={<UserRoute>< UserJobsHistoryHOC /></UserRoute>} />
                    <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC /></UserRoute>} />
                    <Route path='/admin/users' element={<AdminRoute><DashUsersHOC/></AdminRoute>} />
                    <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC/></AdminRoute>} />
                    <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC/></AdminRoute>} />
                    <Route path='/admin/job/create' element={<AdminRoute><DashCreateJobHOC /></AdminRoute>} />
                    <Route path='/admin/edit/job/:id' element={<AdminRoute><DashAdminEditJobHOC /></AdminRoute>} />
                    <Route path='/admin/category/create' element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />
                    <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            </ProSidebarProvider> 
        </ThemeProvider>    
        </>
    );
};

export default App;
