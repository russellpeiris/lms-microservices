import { Link } from 'react-router-dom';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import { useGetCourseById } from '../../hooks/courseHooks';
import axios from 'axios';
//import { loadStripe } from '@stripe/stripe-js';

const CoursePanel = ({ courseId, open, handleCancel }) => {
    const BASE_URL = 'http://localhost:4004';

    const [confirmLoading, setConfirmLoading] = useState(false);
    const { data, isLoading } = useGetCourseById(courseId);
    const [error, setError] = useState(null);

    console.log(data?.course);

    const paymentHandler = async () => {
        try {
            const { data } = await axios.post('http://localhost:4004/create-checkout-session', {
                courseId: courseId,
            });

            if (data.sessionId) {
                window.location.href = data.checkoutUrl; // Redirect to Stripe Checkout
            } else {
                setError('Failed to initiate payment. Please try again.');
            }
        } catch (err) {
            setError('Failed to initiate payment. Please try again.');
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
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={paymentHandler}>
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
