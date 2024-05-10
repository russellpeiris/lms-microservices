import React from 'react';
import LearnerTable from '../../components/tables/LearnerTable';
import InstructorTable from '../../components/tables/InstructorTable';
import PaymentTable from '../../components/tables/PaymentTable';
import ApprovalTable from '../../components/tables/ApprovalTable';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import CourseModal from '../../components/instructor/CourseModal';

const Home = () => {
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();
    const getTable = () => {
        switch (userRole) {
            case 'admin':
                return (
                    <>
                        <ApprovalTable />
                        <PaymentTable />
                    </>
                );
            case 'instructor':
                return <>
                    <CourseModal />
                    <InstructorTable />
                </>;
            case 'learner':
                return <LearnerTable />;
            default:
                navigate('/');
        }
    };
    return <div>{getTable()}</div>;
};

export default Home;
