import { CREATE_MEDICAL_RECORD_SUCCESS, CREATE_MEDICAL_RECORD_ERROR, GET_ALL_MEDICAL_RECORD_SUCCESS, GET_ALL_MEDICAL_RECORD_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const createMedicalRecord = (businessId, medicalRecords) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.post(`/records/${businessId}`, { medicalRecords }, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(CREATE_MEDICAL_RECORD_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(CREATE_MEDICAL_RECORD_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const GetAllMedicalRecords = (businessId) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get(`/records/${businessId}`, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(GET_ALL_MEDICAL_RECORD_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(GET_ALL_MEDICAL_RECORD_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};
export default { createMedicalRecord, GetAllMedicalRecords };
