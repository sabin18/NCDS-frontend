
import jwtDecode from 'jsonwebtoken';

export const storeToken = (token) => localStorage.setItem('token', token);
export const storeUserId = (userId) => localStorage.setItem('userId', userId);
export const storebusinessId = (businessId) => localStorage.setItem('businessId', businessId);

export const getToken = () => localStorage.getItem('token');

export default { storeToken, storeUserId, getToken };
