import { message } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { http } from './api';

export const useGetCourses = () => {
    return useQuery(
        'courses',
        async () => {
            const response = await http.get('/course');
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            onError: (error) => {
                message.error(error.response.data.message);
            },
        },
    );
};

export const useCreateCourse = () => {
    return useMutation(
        async (course) => {
            const response = await http.post('/course', course, {
                withCredentials: 'include',
            });
            return response.data;
        },
        {
            onError: (error) => {
                message.error(error.response.data.message);
            },
        },
    )
};
