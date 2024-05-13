import { message } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Admin, Home, Leaner, Login } from './pages';
import { useEffect } from 'react';

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
            <Route path="/learner/:courseCode" element={<Leaner />} />
        </Routes>
    );
};

export default Router;
