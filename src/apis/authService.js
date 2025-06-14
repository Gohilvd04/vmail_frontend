import apiCall from './config/axiosConfig';
import { ENDPOINTS } from './endpoints';

export const login = async (email, password) => {
  return apiCall({
    endpoint: ENDPOINTS.AUTH.LOGIN,
    method: 'POST',
    data: { email, password },
  });
};

export const register = async (name, email, password) => {
  return apiCall({
    endpoint: ENDPOINTS.AUTH.REGISTER,
    method: 'POST',
    data: { name, email, password },
  });
};

export const logout = async () => {
  localStorage.removeItem('token');
  return apiCall({
    endpoint: ENDPOINTS.AUTH.LOGOUT,
    method: 'POST',
  });
};
