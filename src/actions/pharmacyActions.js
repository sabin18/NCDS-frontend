import {MYBUSINESSES_SUCCESS, MYBUSINESSES_ERROR } from './types';
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
      businessType(MYBUSINESSES_ERROR, error.res),
    );
    // ErrorResponse(error.response.data.Error);
  });

export default { GetAllMyBusiness };
