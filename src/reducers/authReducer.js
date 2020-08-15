import {
  LOGIN_SUCCESS, LOGIN_FAILURE, RESET_PASSWORD_REQUEST_SUCESS, RESET_PASSWORD_REQUEST_FAILURE,
  RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE 
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
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
        dataError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
