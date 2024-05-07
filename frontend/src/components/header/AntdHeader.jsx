import { MenuOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu } from 'antd';
import React from 'react';

const { Header } = Layout;

const logoutMenu = (handleLogout) => (
    <Menu>
        <Menu.Item onClick={handleLogout}>
            Log out <PoweroffOutlined />
        </Menu.Item>
    </Menu>
);

const AntdHeader = () => {
    const onLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <Header
            style={{
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#001529',
            }}
        >
            <div className="logo">LMS Microservice</div>
            <Dropdown overlay={logoutMenu(onLogout)}>
                <MenuOutlined style={{ fontSize: '16px', color: 'white' }} />
            </Dropdown>
        </Header>
    );
};

export default AntdHeader;
