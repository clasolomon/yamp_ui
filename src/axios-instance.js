import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 1000
});

export default instance;
