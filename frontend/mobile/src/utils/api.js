import axios from 'axios';

// Configure API base URL based on environment
const getApiBaseUrl = () => {
  if (__DEV__) {
    // Development mode
    // For iOS simulator: use localhost
    // For Android emulator: use 10.0.2.2
    // For physical device: use your computer's local IP
    // For macOS: use localhost
    return 'http://localhost:3000';
  }
  // Production: update with your production API URL
  return 'https://your-api-domain.com';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

