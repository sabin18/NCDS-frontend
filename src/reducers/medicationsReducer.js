import { GET_ALL_MEDICATIONS_SUCCESS, GET_ALL_MEDICATIONS_ERROR } from '../actions/types';

const initialState = {
  medications: null,
  medicationsError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MEDICATIONS_SUCCESS:
      return {
        ...state,
        medications: action.payload,
        medicationsError: null,
        status: 'Success',
      };
    case GET_ALL_MEDICATIONS_ERROR:
      return {
        ...state,
        medications: null,
        medicationsError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
