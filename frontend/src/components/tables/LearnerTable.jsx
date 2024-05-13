import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCourses } from '../../hooks/courseHooks';

const LearnerTable = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetCourses();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (data) {
            setCourses(data);
        }
    }, [data]);

    const columns = [
        {
            title: 'Course Code',
            dataIndex: 'courseCode',
            key: 'courseCode',
            width: '10%',
        },
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) => (
                <div>
                    <Button type="primary">View</Button>
                    <Button
                        type="link"
                        style={{ marginLeft: 8 }}
                        onClick={() => navigate(`/learner/${record.courseCode}`)}
                    >
                        Enroll
                    </Button>
                </div>
            ),
        },
    ];

    return <Table loading={isLoading} dataSource={courses && courses} columns={columns} bordered pagination={false} />;
};

export default LearnerTable;
