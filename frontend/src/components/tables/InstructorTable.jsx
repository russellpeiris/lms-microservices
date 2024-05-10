import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetCourses } from '../../hooks/courseHooks';


const InstructorTable = () => {

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
                    <Button type="primary" size="small">
                        View
                    </Button>
                    <Button type="primary" size="small" style={{ marginLeft: 8 }}>
                        Edit
                    </Button>
                    <Button danger type="primary" size="small" style={{ marginLeft: 8 }}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];


    const { data, isLoading } = useGetCourses();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        if (data) {
            setCourses(data);
        }
    }, [data]);

    return <Table loading={isLoading} dataSource={courses} columns={columns} bordered pagination={false} />;
};

export default InstructorTable;
