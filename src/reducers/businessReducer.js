import {
  MYBUSINESSES_SUCCESS, MYBUSINESSES_ERROR, MY_SINGLE_BUSINESSES_SUCCESS, MY_SINGLE_BUSINESSES_ERROR, ALL_BUSINESSES_SUCCESS, 
  ALL_BUSINESSES_ERROR, ADD_BUSINESS_SUCCESS, ADD_BUSINESS_ERROR,
} from '../actions/types';

const initialState = {
  business: null,
  businessError: null,
  singleBusiness: null,
  singleBusinessError: null,
  allBusiness: null,
  allBusinessError: null,
  addBusiness: null,
  addBusinessError: null,
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
    case ALL_BUSINESSES_SUCCESS:
      return {
        ...state,
        allBusiness: action.payload,
        allBusinessError: null,
        status: 'Success',
      };
    case ALL_BUSINESSES_ERROR:
      return {
        ...state,
        allBusiness: null,
        allBusinessError: action.payload,
        status: 'Failure',
      };
    case ADD_BUSINESS_SUCCESS:
      return {
        ...state,
        addBusiness: action.payload,
        addBusinessError: null,
        status: 'Success',
      };
    case ADD_BUSINESS_ERROR:
      return {
        ...state,
        addBusiness: null,
        addBusinessError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
