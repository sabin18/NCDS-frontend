import { LOGIN_SUCCESS, LOGIN_FAILURE} from './types';
import { storeToken } from '../helpers/authHelpers';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const authType = (type, payload) => ({
  type,
  payload,
});

export const userLogin = ({ email, password }) => (dispatch) => backendCall.post('/auth/login', { email, password })
  .then((res) => {
    const response = res.data;
    dispatch(
      authType(LOGIN_SUCCESS, response),
      storeToken(res.data.data.token),
      SuccessResponse(response),
    );
  }).catch((error) => {
    dispatch(
      authType(LOGIN_FAILURE, error.response.data),
    );
    ErrorResponse(error.response.data.Error);
  });
export default userLogin;
