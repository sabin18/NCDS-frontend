import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-cycle
import { getToken } from './authHelpers';

const isAuthenticated = () => {
  const token = getToken();
  try {
    const userInfo = jwt.decode(token, 'supersecretjwtkey');
    if (userInfo === null) return false;
    return userInfo;
  } catch (err) {
    return false;
  }
};

export default isAuthenticated;
