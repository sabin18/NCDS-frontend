import { LOGIN_SUCCESS, LOGIN_FAILURE, RESET_PASSWORD_REQUEST_SUCESS, RESET_PASSWORD_REQUEST_FAILURE,
  RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, VERIFY_SUCCESS, VERIFY_ERROR } from './types';
import { storeToken } from '../helpers/authHelpers';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const authType = (type, payload) => ({
  type,
  payload,
});

const host = window.location.origin;

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

export const resetPaswordRequest = (email) => (dispatch) => backendCall.post('/auth/users/forgotpassword', { host, email })

  .then((res) => {
    const response = res.data;
    dispatch(
      authType(RESET_PASSWORD_REQUEST_SUCESS, response),
    );
  }).catch((error) => {
    dispatch(
      authType(RESET_PASSWORD_REQUEST_FAILURE, error.response.data),
    );
    ErrorResponse(error.response.data.Error);
  });

export const resetPasword = (newPassword, confirmPassword, token) => (dispatch) => backendCall.patch(`auth/users/resetpassword/${token}`, { newPassword, confirmPassword })

  .then((res) => {
    const response = res.data;
    dispatch(
      authType(RESET_PASSWORD_SUCCESS, response),
      SuccessResponse(response),
    );
  }).catch((error) => {
    dispatch(
      authType(RESET_PASSWORD_FAILURE, error.response.data),
    );
  });

export const VerifyUsers = (token) => (dispatch) => backendCall.get(`auth/users/verify/${token}`, { token })
  .then((res) => {
    const response = res.data;
    dispatch(
      authType(VERIFY_SUCCESS, response),
      SuccessResponse(response),
    );
  }).catch((error) => {
    dispatch(
      authType(VERIFY_ERROR, error.response.data),
      ErrorResponse(error.response.data.Error),
    );
  });

export default { userLogin, resetPaswordRequest, resetPasword, VerifyUsers };
