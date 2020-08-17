import {MYBUSINESSES_SUCCESS, MYBUSINESSES_ERROR, MY_SINGLE_BUSINESSES_SUCCESS, MY_SINGLE_BUSINESSES_ERROR } from './types';
import { getToken } from '../helpers/authHelpers';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const token = getToken();

const { ErrorResponse, SuccessResponse } = responseComponent;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

const businessType = (type, payload) => ({
  type,
  payload,
});
export const GetAllMyBusiness = () => (dispatch) => backendCall.get('/pharmacy', { headers })

  .then((res) => {
    const response = res.data;
    dispatch(
      businessType(MYBUSINESSES_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      businessType(MYBUSINESSES_ERROR, error.response),
    );
    ErrorResponse(error.response.data.Error);
  });

export const GetOneMyBusiness = (businessId) => (dispatch) => backendCall.get(`/pharmacy/${businessId}`, { headers })

  .then((res) => {
    const response = res.data;
    console.log('actions====>',response);
    dispatch(
      businessType(MY_SINGLE_BUSINESSES_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      businessType(MY_SINGLE_BUSINESSES_ERROR, error.response),
    );
    ErrorResponse(error.response.data.Error);
  });

export default { GetAllMyBusiness, GetOneMyBusiness };
