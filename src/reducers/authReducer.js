import {
  LOGIN_SUCCESS, LOGIN_FAILURE,
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
    default:
      return {
        ...state,
      };
  }
};
