import {MYBUSINESSES_SUCCESS, MYBUSINESSES_ERROR, MY_SINGLE_BUSINESSES_SUCCESS, MY_SINGLE_BUSINESSES_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllMyBusiness = () => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get('/pharmacy', { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(MYBUSINESSES_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(MYBUSINESSES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const GetOneMyBusiness = (businessId) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get(`/pharmacy/${businessId}`, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(MY_SINGLE_BUSINESSES_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(MY_SINGLE_BUSINESSES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export default { GetAllMyBusiness, GetOneMyBusiness };
