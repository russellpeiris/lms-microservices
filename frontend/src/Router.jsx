import { message } from 'antd';
import { useEffect } from 'react';
import { Route, Routes, useNavigate, } from 'react-router-dom';
import { Admin, Home, Login, CheckoutSuccess, CheckoutFailed } from './pages';
import LeanerProfile from './pages/learner/LearnerProfile';

const Router = () => {
    const userRole = localStorage.getItem('userRole');
    const location = window.location;
    const navigate = useNavigate();

    useEffect(() => {
        if (!userRole && location.pathname !== '/') {
            navigate('/');
            message.error('Please login first');
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/learner/:courseCode" element={<LeanerProfile />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/checkout-failed" element={<CheckoutFailed />} />
        </Routes>
    );
};

export default Router;
