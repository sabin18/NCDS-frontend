import { CREATE_MEDICAL_RECORD_SUCCESS, CREATE_MEDICAL_RECORD_ERROR, GET_ALL_MEDICAL_RECORD_SUCCESS, GET_ALL_MEDICAL_RECORD_ERROR } from '../actions/types';

const initialState = {
  record: null,
  recordtError: null,
  allRecords: null,
  allRecordsError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEDICAL_RECORD_SUCCESS:
      return {
        ...state,
        record: action.payload,
        recordError: null,
        status: 'Success',
      };
    case CREATE_MEDICAL_RECORD_ERROR:
      return {
        ...state,
        record: null,
        recordError: action.payload,
        status: 'Failure',
      };
    case GET_ALL_MEDICAL_RECORD_SUCCESS:
      return {
        ...state,
        allRecords: action.payload,
        allRecordsError: null,
        status: 'Success',
      };
    case GET_ALL_MEDICAL_RECORD_ERROR:
      return {
        ...state,
        allRecords: null,
        allRecordsError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
