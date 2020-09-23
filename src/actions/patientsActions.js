import { GET_PATIENT_SUCCESS, GET_PATIENT_ERROR, GET_SINGLE_PATIENT_SUCCESS, GET_SINGLE_PATIENT_ERROR, ADD_PATIENT_SUCCESS, ADD_PATIENT_ERROR, DELETE_PATIENT_SUCCESS, DELETE_PATIENT_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllPatient = (businessId) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get(`/patients/${businessId}`, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(GET_PATIENT_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(GET_PATIENT_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const GetSinglePatient = (businessId, patientId) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get(`/patients/${businessId}/${patientId}`, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(GET_SINGLE_PATIENT_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(GET_SINGLE_PATIENT_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const AddNewPatient = (businessId, patientData) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.post(`/patients/${businessId}`, patientData, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(ADD_PATIENT_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(ADD_PATIENT_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const DeletePatient = (businessId, Id) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.delete(`patients/${businessId}/${Id}`, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(DELETE_PATIENT_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(DELETE_PATIENT_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export default { AddNewPatient, DeletePatient };
