import { GET_PATIENT_SUCCESS, GET_PATIENT_ERROR, GET_SINGLE_PATIENT_SUCCESS, GET_SINGLE_PATIENT_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse } = responseComponent;

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

export default { GetAllPatient, GetSinglePatient };
