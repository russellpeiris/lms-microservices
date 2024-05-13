import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetCourses } from '../../hooks/courseHooks';

const LearnerTable = () => {
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
            dataIndex: 'courseName',
            key: 'courseName',
            width: '30%',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) => (
                <div>
                    <Button type="primary">View</Button>
                    <Button type="link" style={{ marginLeft: 8 }}>
                        Enroll
                    </Button>
                </div>
            ),
        },
    ];

    return <Table loading={isLoading} dataSource={courses} columns={columns} bordered pagination={false} />;
};

export default LearnerTable;
