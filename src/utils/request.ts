import axios from 'axios';
const http = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
  },
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export default http;
