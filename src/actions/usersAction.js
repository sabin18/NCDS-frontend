import { GET_USERS_SUCCESS, GET_USERS_ERROR, ADD_USER_SUCCESS, ADD_USER_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllUsers = () => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get('admin/users', { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(GET_USERS_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(GET_USERS_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

// export const GetSinglePatient = (businessId, patientId) => async (dispatch) => {
//   const { token } = localStorage;
//   const AuthUser = 'Bearer '.concat(token);

//   try {
//     const res = await backendCall.get(`/patients/${businessId}/${patientId}`, { headers: { Authorization: AuthUser } });
//     const response = res.data;
//     dispatch(businessType(GET_SINGLE_PATIENT_SUCCESS, response));
//   } catch (error) {
//     dispatch(businessType(GET_SINGLE_PATIENT_ERROR, error.response));
//     ErrorResponse(error.response.data.Error);
//   }
// };

export const AddNewUser = (userData) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.post('/admin/users', userData, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(ADD_USER_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(ADD_USER_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export default { GetAllUsers, AddNewUser };
