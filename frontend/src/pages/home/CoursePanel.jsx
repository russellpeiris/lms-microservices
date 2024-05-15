import { Link } from 'react-router-dom';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import { useGetCourseById } from '../../hooks/courseHooks';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const CoursePanel = ({ courseId, open, handleCancel }) => {
    const BASE_URL = 'http://localhost:4004';

    const [confirmLoading, setConfirmLoading] = useState(false);
    const { data, isLoading } = useGetCourseById(courseId);
    const [error, setError] = useState(null);

    console.log(data?.course._id);
    console.log(data?.course.courseCode);

    const makePayment = async () => {
        const stripe = await loadStripe(
            'pk_test_51PFEjXSCEV2mDRlu1lz8AHTSQyQpTtT8mZ0zG5b35g7SwjpPX3qaAh1vlZOVV6A0KJiI8JukSd2mFH2B7pytmiB7007ec0pNEq',
        );

        const body = {
            courseId: data?.course._id,
            courseCode: data?.course.courseCode,
            courseName: data?.course.name,
            payment: 4000,
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(`http://localhost:4004/create-checkout-session`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers,
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error);
        }
    };

    return (
        <div>
            <Modal
                width={800}
                title="Create Course"
                open={open}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={makePayment}>
                        Payment and Enroll
                    </Button>,
                ]}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <p>Course Code : {data?.course?.courseCode}</p>
                        <p>Course Name : {data?.course?.name}</p>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default CoursePanel;
