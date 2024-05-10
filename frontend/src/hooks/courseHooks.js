import { message } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { http } from './api';

export const useGetCourses = () => {
    return useQuery(
        'courses',
        async () => {
            const response = await http.get('/course', {
                withCredentials: 'include',
            });
            return response.data;
        },
        {
            refetchOnWindowFocus: true,
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
    );
};

export const useApproveDeclineCourse = () => {
    return useMutation(
        async ({ courseId, approval }) => {
            const response = await http.patch(
                `/course/approve/${courseId}`,
                { approval },
                {
                    withCredentials: 'include',
                },
            );
            return response.data;
        },
        {
            onError: (error) => {
                message.error(error.response.data.message);
            },
            onSuccess: () => {
                message.success('Course approval status updated successfully');
            },
        },
    );
};
