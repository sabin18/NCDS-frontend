import {
  MYBUSINESSES_SUCCESS, MYBUSINESSES_ERROR, MY_SINGLE_BUSINESSES_SUCCESS, MY_SINGLE_BUSINESSES_ERROR, ALL_BUSINESSES_SUCCESS, ALL_BUSINESSES_ERROR,
  ADD_BUSINESS_SUCCESS, ADD_BUSINESS_ERROR,
} from './types';
import backendCall from '../helpers/backendCall';
import { storebusinessId } from '../helpers/authHelpers';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse, SuccessResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllMyBusiness = () => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get('/pharmacy', { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(MYBUSINESSES_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(MYBUSINESSES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const GetOneMyBusiness = (businessId) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get(`/pharmacy/${businessId}`, { headers: { Authorization: AuthUser } });
    const response = res.data;

    dispatch(businessType(MY_SINGLE_BUSINESSES_SUCCESS, response),
      storebusinessId(response.data.id));
  } catch (error) {
    dispatch(businessType(MY_SINGLE_BUSINESSES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const AllBusiness = () => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get('/admin/pharmacy', { headers: { Authorization: AuthUser } });
    const response = res.data;

    dispatch(businessType(ALL_BUSINESSES_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(ALL_BUSINESSES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export const AddBusiness = (pharmacyData) => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.post('/admin/pharmacy', pharmacyData, { headers: { Authorization: AuthUser } });
    const response = res.data;

    dispatch(businessType(ADD_BUSINESS_SUCCESS, response),
      SuccessResponse(response));
  } catch (error) {
    dispatch(businessType(ADD_BUSINESS_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};

export default { GetAllMyBusiness, GetOneMyBusiness };
