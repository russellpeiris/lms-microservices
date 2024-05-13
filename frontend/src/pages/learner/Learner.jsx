import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import { Flex, Progress } from 'antd';
import ProgressModal from './Progress';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCoursebyCode } from '../../hooks/learnerHooks';

const Leaner = () => {
    let { courseCode } = useParams();
    const { data, isLoading, refetch } = useGetCoursebyCode(courseCode);
    // console.log(courseCode);
    const [progress, setProgress] = useState(0);
    const updateProgress = (value) => {
        setProgress(value);
    };
    console.log(data);
    const navigate = useNavigate();
    const Names = {
        _id: '66422380fa3c7e0811c04b60',
        courseCode: '3',
        name: 'Course with content',
        courseContent: [
            {
                lectureNumber: 11,
                lecturePdfUrl: '1',
                lectureVideoUrl: '1',
                lectureQuizUrl: '1',
                _id: '66422380fa3c7e0811c04b61',
            },
            {
                lectureNumber: 11,
                lecturePdfUrl: '1',
                lectureVideoUrl: '1',
                lectureQuizUrl: '1',
                _id: '66422380fa3c7e0811c04b61',
            },
        ],
        approval: 'pending',
        createdAt: '2024-05-13T14:28:16.155Z',
        updatedAt: '2024-05-13T14:28:16.155Z',
        __v: 0,
    };

    return (
        <>
            <div style={{ color: 'black', maxWidth: '1280px', margin: 'auto' }}>
                <Row>
                    <Col span={24}>
                        <h1 style={{ padding: '10px 0' }}>
                            {data.name} - {data.courseCode}
                        </h1>
                        <h3 style={{ padding: '10px 0 30px 0', color: 'blue' }}>Course Details</h3>
                        <Row style={{ borderRadius: '8px', boxShadow: '0 0 15px #807f7f4f' }}>
                            <Col span={12}>
                                {Names.courseContent.map((course, index) => (
                                    <Row key={index}>
                                        <a
                                            href={course.lecturePdfUrl}
                                            target="_blank"
                                            style={{
                                                background: 'linear-gradient(45deg, #001529, #095aa6)',
                                                color: 'white',
                                                fontSize: '32px',
                                                fontWeight: '600',
                                                borderRadius: '7px',
                                                height: '150px',
                                                width: '150px',
                                                alignContent: 'center',
                                                textAlign: 'center',
                                                margin: '20px',
                                            }}
                                        >
                                            PDF
                                        </a>
                                        <a
                                            href={course.lectureVideoUrl}
                                            target="_blank"
                                            style={{
                                                background: 'linear-gradient(45deg, #001529, #095aa6)',
                                                color: 'white',
                                                fontSize: '32px',
                                                fontWeight: '600',
                                                borderRadius: '7px',
                                                height: '150px',
                                                width: '150px',
                                                alignContent: 'center',
                                                textAlign: 'center',
                                                margin: '20px',
                                            }}
                                        >
                                            Video
                                        </a>
                                        <a
                                            href={course.lectureQuizUrl}
                                            target="_blank"
                                            style={{
                                                background: 'linear-gradient(45deg, #001529, #095aa6)',
                                                color: 'white',
                                                fontSize: '32px',
                                                fontWeight: '600',
                                                borderRadius: '7px',
                                                height: '150px',
                                                width: '150px',
                                                alignContent: 'center',
                                                textAlign: 'center',
                                                margin: '20px',
                                            }}
                                        >
                                            Quiz
                                        </a>
                                    </Row>
                                ))}
                            </Col>

                            <Col span={12}>
                                <div style={{ width: '80%' }}>
                                    <Flex gap="small" vertical>
                                        <h3 style={{ padding: '10px 0', color: 'blue' }}>Current Progress</h3>
                                        <Progress percent={progress} />
                                        {/* <Button type="primary" style={{ marginTop: '10px' }}>
                                            Add Progress
                                        </Button> */}
                                        <ProgressModal courseCode={courseCode} onUpdateProgress={updateProgress} />
                                        <Button
                                            type="dashed"
                                            danger
                                            style={{ marginTop: '10px' }}
                                            onClick={() => {
                                                navigate('/home');
                                            }}
                                        >
                                            Un Enroll
                                        </Button>
                                    </Flex>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Leaner;
