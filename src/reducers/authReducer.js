import {
  LOGIN_SUCCESS, LOGIN_FAILURE, RESET_PASSWORD_REQUEST_SUCESS, RESET_PASSWORD_REQUEST_FAILURE,
  RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, VERIFY_SUCCESS, VERIFY_ERROR 
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  verify: null,
  verifyError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataError: null,
        status: 'Success',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        dataError: action.payload,
        status: 'Failure',
      };
    case RESET_PASSWORD_REQUEST_SUCESS:
      return {
        ...state,
        data: action.payload,
        dataError: null,
        status: 'Success',
      };
    case RESET_PASSWORD_REQUEST_FAILURE:
      return {
        ...state,
        dataError: action.payload,
        status: 'Failure',
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataError: null,
        status: 'Success',
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        data: null,
        dataError: action.payload,
        status: 'Failure',
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        verify: action.payload,
        verifyError: null,
        status: 'Success',
      };
    case VERIFY_ERROR:
      return {
        ...state,
        verifyError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
