import jwtDecode from 'jsonwebtoken';
import isAuth from './isAuthenticated';

export const storeToken = (token) => localStorage.setItem('token', token);
export const storeUserId = (userId) => localStorage.setItem('userId', userId);
export const storebusinessId = (businessId) => localStorage.setItem('businessId', businessId);

export const getToken = () => localStorage.getItem('token');

export const checkAdmin = () => {
  const userInfo = isAuth();
  if (userInfo) {
    const { payload } = userInfo;
    const { role } = payload;
    if (role !== 1) {
      return false;
    }
    return true;
  }
  return false;
};

export default {
  storeToken, storeUserId, getToken, checkAdmin,
};
