import Axios from 'axios';

const apiClient = Axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Handle server errors (e.g., 4xx, 5xx)
    } else if (error.request) {
      // Handle network errors
    } else {
      // Handle other errors
    }
    return Promise.reject(error);
  },
);
export default apiClient;
