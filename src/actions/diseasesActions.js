import { GET_ALL_DISEASES_SUCCESS, GET_ALL_DISEASES_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllDiseases = () => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get('/diseases', { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(GET_ALL_DISEASES_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(GET_ALL_DISEASES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export default { GetAllDiseases };