import { GET_ALL_DISEASES_SUCCESS, GET_ALL_DISEASES_ERROR, ADD_DISEASES_SUCCESS, ADD_DISEASES_ERROR, UPLOAD_DISEASES_SUCCESS, UPLOAD_DISEASES_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

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

export const AddNewDisease = (name) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.post('/diseases/', { name }, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(ADD_DISEASES_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(ADD_DISEASES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const uploadDisease = (fileData) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.post('/diseases/upload-csv', fileData, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(UPLOAD_DISEASES_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(UPLOAD_DISEASES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export default { GetAllDiseases, uploadDisease };
