import { SEND_SMS_SUCCESS, SEND_SMS_ERROR } from './types';
import backendCall from '../helpers/backendCall';
import responseComponent from '../components/main components/responseComponent';

const { ErrorResponse } = responseComponent;

const businessType = (type, payload) => ({
  type,
  payload,
});

export const SendSMS = () => async (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);

  try {
    const res = await backendCall.get('notifications/SMS', { headers: { Authorization: AuthUser } });
    const response = res.data;
    dispatch(businessType(SEND_SMS_SUCCESS, response));
  } catch (error) {
    dispatch(businessType(SEND_SMS_ERROR, error.response));
    ErrorResponse(error.response.data.Error);
  }
};
export default { SendSMS };
