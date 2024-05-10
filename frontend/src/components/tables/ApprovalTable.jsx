import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetCourses } from '../../hooks/courseHooks';



const dataSource = [
    {
        courseCode: 'CSC101',
        courseName: 'Introduction to Computer Science',
    },
    {
        courseCode: 'MATH202',
        courseName: 'Calculus II',
    },
    // Add more course data objects here
];

const ApprovalTable = () => {

    const { data, isLoading } = useGetCourses();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        if (data) {
            data.filter((course) => {
                if (course.approval === 'pending') {
                    setCourses((courses) => [...courses, course]);
                }
            });
            console.log('data :', data);
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
            key: 'courseName',
            width: '30%',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) => (
                <div>
                    <Button type="primary" size="small">
                        Approve
                    </Button>
                    <Button size="small" style={{ marginLeft: 8 }}>
                        Decline
                    </Button>
                </div>
            ),
        },
    ];
    return <Table dataSource={courses} columns={columns} bordered pagination={false} />;
};

export default ApprovalTable;
