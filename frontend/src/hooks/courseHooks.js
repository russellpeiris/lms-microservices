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
            refetchOnWindowFocus: false,
            onError: (error) => {
                message.error(error.response.data.message);
            },
        },
    );
};

//get course by id hook
export const useGetCourseById = (courseId) => {
    return useQuery(
        ['courses', courseId],
        async () => {
            const response = await http.get(`/course/${courseId}`, {
                withCredentials: 'include',
            });
            return response.data;
        },
        {
            enabled: !!courseId,
            refetchOnWindowFocus: true,
            onError: (error) => {
                message.error(error.response.data.message);
            },
        },
    );
};

//get course by id hook
export const useGetCourseById = (courseId) => {
    return useQuery(
        ['courses', courseId],
        async () => {
            const response = await http.get(`/course/${courseId}`, {
                withCredentials: 'include',
            });
            return response.data;
        },
        {
            enabled: !!courseId,
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
            onSuccess: () => {
                message.success('Course created successfully');
            },
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

export const useDeleteCourse = () => {
    return useMutation(
        async ({ courseId }) => {
        async ({ courseId }) => {
            const response = await http.delete(`/course/${courseId}`, {
                withCredentials: 'include',
            });
            return response.data;
        },
        {
            onError: (error) => {
                message.error(error.response.data.message);
            },
            onSuccess: () => {
                message.success('Course deleted successfully');
            },
        },
    );
};

export const useUpdateCourse = () => {
    return useMutation(
        async (course) => {
            console.log('course :', course);
            const response = await http.patch(`/course/${course.courseId}`, course.values, {
                withCredentials: 'include',
            });
            return response.data;
        },
        {
            onError: (error) => {
                message.error(error.response.data.message);
            },
            onSuccess: () => {
                message.success('Course updated successfully');
            },
        },
    );
};
