import axios from 'axios';

const client = axios.create({
  baseURL: 'localhost:5278/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally add interceptors
client.interceptors.request.use(
  (config) => {
    // e.g., attach token
    const token = 'your-auth-token'; // or get from storage/context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
