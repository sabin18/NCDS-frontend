import { GET_ROLES_SUCCESS, GET_ROLES_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const GetAllRoles = () => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get('admin/roles', { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(GET_ROLES_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(GET_ROLES_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};
export default { GetAllRoles };
