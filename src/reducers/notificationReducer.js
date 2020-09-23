import { SEND_SMS_SUCCESS, SEND_SMS_ERROR } from '../actions/types';

const initialState = {
  sendSMS: null,
  sendSMSError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_SMS_SUCCESS:
      return {
        ...state,
        sendSMS: action.payload,
        sendSMSError: null,
        status: 'Success',
      };
    case SEND_SMS_ERROR:
      return {
        ...state,
        sendSMS: null,
        sendSMSError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
