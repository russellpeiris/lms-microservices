import React from "react";
import { Table, Button } from "antd";

const columns = [
    {
        title: "Course Code",
        dataIndex: "courseCode",
        key: "courseCode",
        width: "10%"
    },
    {
        title: "Payment ID",
        dataIndex: "paymentId",
        key: "paymentId",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: "Action",
        dataIndex: "",
        key: "action",
        render: (record) => (
            <Button type="primary" size="small">
                View
            </Button>
        ),
    },
];

const dataSource = [
    {
        courseCode: "CSC101",
        paymentId: "PAY-12345",
        amount: 100.00,
    },
    {
        courseCode: "MATH202",
        paymentId: "PAY-67890",
        amount: 150.50,
    },
    // Add more payment data objects here
];

const PaymentTable = () => {
    return (
        <Table dataSource={dataSource} columns={columns} bordered pagination={false} />
    );
};

export default PaymentTable;
