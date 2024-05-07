import { Button, Table } from "antd";
import React from "react";

const columns = [
    {
        title: "Course Code",
        dataIndex: "courseCode",
        key: "courseCode",
        width: "10%",
    },
    {
        title: "Course Name",
        dataIndex: "courseName",
        key: "courseName",
        width: "30%",
    },
    {
        title: "Action",
        dataIndex: "",
        key: "action",
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

const dataSource = [
    {
        courseCode: "CSC101",
        courseName: "Introduction to Computer Science",
    },
    {
        courseCode: "MATH202",
        courseName: "Calculus II",
    },
    // Add more course data objects here
];

const InstructorTable = () => {
    return (
        <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
    );
};

export default InstructorTable;
