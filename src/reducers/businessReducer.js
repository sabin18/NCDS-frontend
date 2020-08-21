import {
  MYBUSINESSES_SUCCESS, MYBUSINESSES_ERROR, MY_SINGLE_BUSINESSES_SUCCESS, MY_SINGLE_BUSINESSES_ERROR,
} from '../actions/types';

const initialState = {
  business: null,
  businessError: null,
  singleBusiness: null,
  singleBusinessError: null,
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

    case MY_SINGLE_BUSINESSES_SUCCESS:
      return {
        ...state,
        singleBusiness: action.payload,
        singleBusinessError: null,
        status: 'Success',
      };
    case MY_SINGLE_BUSINESSES_ERROR:
      return {
        ...state,
        singleBusiness: null,
        singleBusinessError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
