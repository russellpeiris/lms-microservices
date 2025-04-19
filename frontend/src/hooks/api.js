import axios from 'axios';

const http = axios.create({
    baseURL: `${import.meta.env.VITE_GATEWAY_API}` ,
});

// // In here, we handle the api error
// http.interceptors.response.use(undefined, (error) =>
//   Promise.reject({
//     msg: getApiError(error),
//     status: error.response.status || 500,
//   }),
// );

// http.interceptors.request.use((config) => {
//   config.withCredentials = true;
//   return config;
// });

export { http };

