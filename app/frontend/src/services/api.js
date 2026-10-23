import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to handle errors cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData = error.response?.data?.error || {
      message: error.message || 'Network error occurred. Please check your connection.'
    };
    return Promise.reject(errorData);
  }
);

export default api;
