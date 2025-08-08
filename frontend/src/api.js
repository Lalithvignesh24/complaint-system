import axios from 'axios';

// Get the authentication token from where you stored it after login (e.g., localStorage)
const token = localStorage.getItem('token');

// Create a new Axios instance with a custom configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Sets the base URL for all API calls
  headers: {
    'Content-Type': 'application/json',
    // Attaches the Authorization header to every request if a token exists
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

/**
 * Optional but recommended: Add a response interceptor.
 * This function will check every response from the API. If it sees a 401 Unauthorized
 * error, it means the token is expired or invalid. It will then automatically
 * clear the bad token and redirect the user to the login page.
 */
api.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  (error) => {
    // If the server responds with a 401 error
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Remove the invalid token
      window.location.href = '/login'; // Redirect to the login page
    }
    // For all other errors, just pass them along
    return Promise.reject(error);
  }
);

export default api;