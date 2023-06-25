// utils/axiosInterceptor.ts

import { API_BASEURL } from '@/config/constants';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASEURL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});

const requestRetryTracker: Record<string, boolean> = {}; // Track retried requests

/* Request interceptor */
axiosInstance.interceptors.request.use(
  (config) => {
    /* Modify config or do something before making a request */

    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    /* Handle request error */
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

/* Response interceptor */
axiosInstance.interceptors.response.use(
  (response) => {
    /* Handle successful response */
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest && !requestRetryTracker[originalRequest.url!]) {
      requestRetryTracker[originalRequest.url!] = true;

      try {
        /* Call your refresh token API here */
        const refreshTokenResponse = await axiosInstance.post('/refresh-token', {
          // Add your refresh token parameters if needed
        });

        // Update the token in localStorage or wherever you store it
        const newToken = refreshTokenResponse.data.token;
        localStorage.setItem('token', newToken);

        // Retry the original request with the new token
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        } else {
          originalRequest.headers = { 'Authorization': `Bearer ${newToken}` };
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        /* Handle refresh token error */
        console.error('Refresh token error:', refreshError);
        /* Redirect to login or handle as needed */
      }
    }

    /* Handle other response errors */
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
