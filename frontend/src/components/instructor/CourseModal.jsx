import { DeleteFilled } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCreateCourse } from '../../hooks/courseHooks';
const CourseModal = ( {isEdit} ) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { mutate: createCourse, isLoading, isSuccess } = useCreateCourse();
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            createCourse(values);
            console.log('Received values of form:', values);
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            setConfirmLoading(false);
            form.resetFields();
        }

    }, [isLoading, isSuccess]);
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            {isEdit ? ('') : (
                <>
                    <Button type="primary" onClick={showModal}>
                        Create Course
                    </Button>
                    <Modal
                        width={800}
                        title="Create Course"
                        open={open}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
                                Create
                            </Button>,
                        ]}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            name="course_form"
                        >
                            <Form.Item
                                name="courseCode"
                                label="Course Code"
                                rules={[{ required: true, message: 'Please input the course code!' }]}
                            >
                                <Input placeholder="Enter course code" />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Course Name"
                                rules={[{ required: true, message: 'Please input the course name!' }]}
                            >
                                <Input placeholder="Enter course name" />
                            </Form.Item>
                            <Form.List name="lectureContent">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'self-end' }}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'lectureNumber']}
                                                    fieldKey={[fieldKey, 'lectureNumber']}
                                                    label="Lecture Number"
                                                    rules={[{ required: true, message: 'Please input the lecture number!' }]}
                                                >
                                                    <Input placeholder="Enter lecture number" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'lecturePdfUrl']}
                                                    fieldKey={[fieldKey, 'lecturePdfUrl']}
                                                    label="PDF URL"
                                                    rules={[{ required: true, message: 'Please input the PDF URL!' }]}
                                                >
                                                    <Input placeholder="Enter PDF URL" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'lectureVideoUrl']}
                                                    fieldKey={[fieldKey, 'lectureVideoUrl']}
                                                    label="Video URL"
                                                    rules={[{ required: true, message: 'Please input the video URL!' }]}
                                                >
                                                    <Input placeholder="Enter video URL" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'lectureQuizUrl']}
                                                    fieldKey={[fieldKey, 'lectureQuizUrl']}
                                                    label="Quiz URL"
                                                    rules={[{ required: true, message: 'Please input the quiz URL!' }]}
                                                >
                                                    <Input placeholder="Enter quiz URL" />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button danger onClick={() => remove(name)}><DeleteFilled /></Button>
                                                </Form.Item>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block>
                                                Add Lecture
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Form>
                    </Modal></>
            )}
        </>
    );
};

export default CourseModal;
