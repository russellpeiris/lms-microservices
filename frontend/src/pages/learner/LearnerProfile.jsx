/* eslint-disable react/jsx-no-target-blank */
import { Button, Col, Flex, Progress, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCoursebyCode, useGetCurrentLearner, LearnerUnenroll } from '../../hooks/learnerHooks';
import ProgressModal from './Progress';

const LeanerProfile = () => {
    let { courseCode } = useParams();
    const { data } = useGetCoursebyCode(courseCode);
    const { learner } = useGetCurrentLearner();
    const { mutate: unenrol } = LearnerUnenroll(courseCode);
    console.log('learner: ', learner);
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
                lectureNumber: 1,
                lecturePdfUrl: '1',
                lectureVideoUrl: '1',
                lectureQuizUrl: '1',
                _id: '66422380fa3c7e0811c04b61',
            },
            {
                lectureNumber: 2,
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
                                        <div
                                            style={{
                                                width: '90%',
                                                height: '25px',
                                                // border: '1px solid black',
                                                borderRadius: '8px',
                                                margin: '10px',
                                                marginTop: '20px',
                                                background:
                                                    'linear-gradient(45deg, rgb(154 165 176), rgb(114 120 125))',
                                                padding: '5px',
                                                boxShadow: '0 0 15px #807f7f4f',
                                            }}
                                        >
                                            <span style={{ colour: 'white', fontWeight: 'bold', padding: '5px' }}>
                                                Lecture - {course.lectureNumber}
                                            </span>
                                        </div>
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
                                        {/* {learner &&
                                            learner.progress.map((course) => {
                                                if (course.course === courseCode) {
                                                    return (
                                                        <Progress
                                                            key={course.course}
                                                            percent={course.overallCompletion}
                                                        />
                                                    );
                                                }
                                                return null; // This ensures that if the condition is not met, nothing is rendered
                                            })} */}
                                        <Progress percent={progress} />
                                        <ProgressModal courseCode={courseCode} onUpdateProgress={updateProgress} />
                                        <Button
                                            type="dashed"
                                            danger
                                            style={{ marginTop: '10px' }}
                                            onClick={() => {
                                                unenrol({ courseCode: courseCode });
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

export default LeanerProfile;
