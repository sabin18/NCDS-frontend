import { GET_USERS_SUCCESS, GET_USERS_ERROR, ADD_USER_SUCCESS, ADD_USER_ERROR } from '../actions/types';

const initialState = {
  users: null,
  usersError: null,
  addUser: null,
  addUserError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        usersError: null,
        status: 'Success',
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        users: null,
        usersError: action.payload,
        status: 'Failure',
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        usersError: null,
        status: 'Success',
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        users: null,
        usersError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
