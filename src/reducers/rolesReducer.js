import { GET_ROLES_SUCCESS, GET_ROLES_ERROR } from '../actions/types';

const initialState = {
  roles: null,
  rolesError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        rolesError: null,
        status: 'Success',
      };
    case GET_ROLES_ERROR:
      return {
        ...state,
        roles: null,
        rolesError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
