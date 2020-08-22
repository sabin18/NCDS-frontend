import { GET_ALL_DISEASES_SUCCESS, GET_ALL_DISEASES_ERROR } from '../actions/types';

const initialState = {
  diseases: null,
  diseasesError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DISEASES_SUCCESS:
      return {
        ...state,
        diseases: action.payload,
        diseasesError: null,
        status: 'Success',
      };
    case GET_ALL_DISEASES_ERROR:
      return {
        ...state,
        diseases: null,
        diseasesError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
