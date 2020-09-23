import { GET_PATIENT_SUCCESS, GET_PATIENT_ERROR, GET_SINGLE_PATIENT_SUCCESS, GET_SINGLE_PATIENT_ERROR, ADD_PATIENT_SUCCESS, ADD_PATIENT_ERROR, DELETE_PATIENT_SUCCESS, DELETE_PATIENT_ERROR } from '../actions/types';

const initialState = {
  patient: null,
  patientError: null,
  singlePatient: null,
  singleatientError: null,
  addPatient: null,
  addpatientError: null,
  deletePatient: null,
  deletePatientError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENT_SUCCESS:
      return {
        ...state,
        patient: action.payload,
        patientError: null,
        status: 'Success',
      };
    case GET_PATIENT_ERROR:
      return {
        ...state,
        patient: null,
        patientError: action.payload,
        status: 'Failure',
      };
    case GET_SINGLE_PATIENT_SUCCESS:
      return {
        ...state,
        singlePatient: action.payload,
        singlePatientError: null,
        status: 'Success',
      };
    case GET_SINGLE_PATIENT_ERROR:
      return {
        ...state,
        singlePatient: null,
        singlePatientError: action.payload,
        status: 'Failure',
      };
    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        addPatient: action.payload,
        addPatientError: null,
        status: 'Success',
      };
    case ADD_PATIENT_ERROR:
      return {
        ...state,
        addPatient: null,
        addPatientError: action.payload,
        status: 'Failure',
      };
    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        deletePatient: action.payload,
        deletePatientError: null,
        status: 'Success',
      };
    case DELETE_PATIENT_ERROR:
      return {
        ...state,
        deletePatient: null,
        deletePatientError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
