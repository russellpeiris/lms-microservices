import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCourses } from '../../hooks/courseHooks';
import { LearnerEnroll } from '../../hooks/learnerHooks';import CoursePanel from '../../pages/home/CoursePanel';

const LearnerTable = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetCourses();
    const [courses, setCourses] = useState([]);
    const { mutate: enrol } = LearnerEnroll();
    const [courseId, setCourseId] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (data) {
            setCourses(data);
        }
    }, [data]);

    const handleCancel = () => {
        setOpen(false);
    };

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
                        View
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        style={{ marginLeft: 8 }}
                        onClick={() => {
                            console.log(record._id);
                            setCourseId(record._id);
                            setOpen(true);
                        }}
                    >
                        Enroll
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table loading={isLoading} dataSource={courses} columns={columns} bordered pagination={false} />
            <CoursePanel courseId={courseId} open={open} handleCancel={handleCancel} />
        </div>
    );
};

export default LearnerTable;
