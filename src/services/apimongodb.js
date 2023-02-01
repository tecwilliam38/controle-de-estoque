import axios from 'axios';

const api = axios.create(
    {
        baseURL: "https://back-end-mauve.vercel.app/"
    }
    );
    // baseURL:"http://localhost:3002/"

export default api;
