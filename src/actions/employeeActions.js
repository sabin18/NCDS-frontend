import { GET_EMPLOYEE_SUCCESS, GET_EMPLOYEE_ERROR, ADD_EMPLOYEE_SUCCESS, ADD_EMPLOYEE_ERROR, DELETE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllEmployee = (businessId) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get(`/employee/${businessId}`, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(GET_EMPLOYEE_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(GET_EMPLOYEE_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const AddNewEmployee = (userData, businessId) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.post(`/employee/${businessId}`, userData, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(ADD_EMPLOYEE_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(ADD_EMPLOYEE_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const DeleteEmployee = (businessId, Id) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  try {
    const res = await backendCall.delete(`/employee/${businessId}/${Id}`, { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(DELETE_EMPLOYEE_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(DELETE_EMPLOYEE_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export default { AddNewEmployee, DeleteEmployee };
