import { message } from 'antd';
import { useMutation } from 'react-query';
import { http } from './api';

export const useLogin = () => {
    return useMutation(
        async (data) => {
            const response = await http.post('/auth/login', data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                localStorage.setItem('userRole', data?.role);
                if (data.role === 'admin') {
                    window.location.href = '/home';
                }
            },
            onError: (error) => {
                message.error(error.response.data.message);
            },
        },
    );
};
