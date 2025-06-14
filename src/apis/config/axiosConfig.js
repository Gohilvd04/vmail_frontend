import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // Ensure credentials are included in requests
});

const apiCall = async ({
  endpoint,
  method = 'GET',
  data = {},
  options = {},
  responseType = 'json',
  params,
  contentType = 'application/json'
}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': contentType,
    'Authorization': token,
    ...options.headers,
  };

  try {
    const response = await apiClient({
      url: endpoint,
      method,
      data,
      headers,
      params,
      responseType,
    });
    return response;
  } catch (error) {
    console.error('API call error:', error.response || error.message);
    throw error;
  }
};

export default apiCall;
