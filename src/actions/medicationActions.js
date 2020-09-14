import { GET_ALL_MEDICATIONS_SUCCESS, GET_ALL_MEDICATIONS_ERROR, ADD_MEDICATIONS_SUCCESS, ADD_MEDICATIONS_ERROR, UPLOAD_MEDICATIONS_SUCCESS, UPLOAD_MEDICATIONS_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllMedications = () => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get('/medications', { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(GET_ALL_MEDICATIONS_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(GET_ALL_MEDICATIONS_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const AddNewMedication = (name) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.post('/medications/', { name }, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(ADD_MEDICATIONS_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(ADD_MEDICATIONS_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const uploadMedication = (fileData) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.post('/medications/upload-csv', fileData, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(UPLOAD_MEDICATIONS_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(UPLOAD_MEDICATIONS_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export default { GetAllMedications, AddNewMedication, uploadMedication };
