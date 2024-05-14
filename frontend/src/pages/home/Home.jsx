import React from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from '../admin/Admin';
import Instructor from '../instructor/Instructor';
import Learner from '../learner/Learner';
import CoursePanel from './CoursePanel';

const Home = () => {
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();
    const getTable = () => {
        switch (userRole) {
            case 'admin':
                return <Admin/>;
            case 'instructor':
                return <Instructor/>;
            case 'learner':
                return (
                    <>
                        <LearnerTable />
                        <CoursePanel />
                    </>
                );
            default:
                navigate('/');
        }
    };
    return <div>{getTable()}</div>;
};

export default Home;
