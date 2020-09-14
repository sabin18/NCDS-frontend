import { GET_ALL_DISEASES_SUCCESS, GET_ALL_DISEASES_ERROR, ADD_DISEASES_SUCCESS, ADD_DISEASES_ERROR, UPLOAD_DISEASES_SUCCESS, UPLOAD_DISEASES_ERROR } from '../actions/types';

const initialState = {
  diseases: null,
  diseasesError: null,
  addDiseases: null,
  addDiseasesError: null,
  uploadDiseases: null,
  uploadDiseasesError: null,
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
    case ADD_DISEASES_SUCCESS:
      return {
        ...state,
        addDiseases: action.payload,
        addDiseasesError: null,
        status: 'Success',
      };
    case ADD_DISEASES_ERROR:
      return {
        ...state,
        addDiseases: null,
        addDiseasesError: action.payload,
        status: 'Failure',
      };
    case UPLOAD_DISEASES_SUCCESS:
      return {
        ...state,
        uploadDiseases: action.payload,
        uploadDiseasesError: null,
        status: 'Success',
      };
    case UPLOAD_DISEASES_ERROR:
      return {
        ...state,
        uploadDiseases: null,
        uploadDiseasesError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
