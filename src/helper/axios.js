import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
let headers = {};

if (localStorage.token) {
    headers.Authorization = `Bearer  + ${localStorage.token}`;
}

const axiosInstace = axios.create({
    baseUrl: baseUrl,
    headers
});

export default axiosInstace;
