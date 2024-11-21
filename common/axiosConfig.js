// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Set your backend base URL
  timeout: 10000, // Set a timeout for requests
});

export default api;
