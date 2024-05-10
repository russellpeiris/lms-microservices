import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetCourses } from '../../hooks/courseHooks';


const ApprovalTable = () => {

    const { data, isLoading } = useGetCourses();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        if (data) {
            const pendingCourses = data.filter((course) => course.approval === 'pending');
            setCourses(pendingCourses);
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
    return <Table loading={isLoading} dataSource={courses} columns={columns} bordered pagination={false} />;
};

export default ApprovalTable;
