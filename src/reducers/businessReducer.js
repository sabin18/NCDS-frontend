import { MYBUSINESSES_SUCCESS, MYBUSINESSES_ERROR } from '../actions/types';

const initialState = {
  business: null,
  businessError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MYBUSINESSES_SUCCESS:
      return {
        ...state,
        business: action.payload,
        dataError: null,
        status: 'Success',
      };
    case MYBUSINESSES_ERROR:
      return {
        ...state,
        business: null,
        businessError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
