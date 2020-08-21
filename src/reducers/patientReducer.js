import { GET_PATIENT_SUCCESS, GET_PATIENT_ERROR } from '../actions/types';

const initialState = {
  patient: null,
  patientError: null,
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
    default:
      return {
        ...state,
      };
  }
};
