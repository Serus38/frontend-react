import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3001/'
    baseURL: 'https://api-rest-2yv0.onrender.com'
});

export {
    axiosInstance
}