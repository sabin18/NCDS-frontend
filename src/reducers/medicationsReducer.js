import { GET_ALL_MEDICATIONS_SUCCESS, GET_ALL_MEDICATIONS_ERROR, ADD_MEDICATIONS_SUCCESS, ADD_MEDICATIONS_ERROR, UPLOAD_MEDICATIONS_SUCCESS, UPLOAD_MEDICATIONS_ERROR } from '../actions/types';

const initialState = {
  medications: null,
  medicationsError: null,
  addMedication: null,
  addMedicationError: null,
  uploadMedication: null,
  uploadMedicationError: null,
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
    case ADD_MEDICATIONS_SUCCESS:
      return {
        ...state,
        addMedication: action.payload,
        addMedicationError: null,
        status: 'Success',
      };
    case ADD_MEDICATIONS_ERROR:
      return {
        ...state,
        addMedication: null,
        addMedicationError: action.payload,
        status: 'Failure',
      };
    case UPLOAD_MEDICATIONS_SUCCESS:
      return {
        ...state,
        uploadMedication: action.payload,
        uploadMedicationError: null,
        status: 'Success',
      };
    case UPLOAD_MEDICATIONS_ERROR:
      return {
        ...state,
        uploadMedication: null,
        uploadMedicationError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
