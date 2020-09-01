import { CREATE_MEDICAL_RECORD_SUCCESS, CREATE_MEDICAL_RECORD_ERROR } from '../actions/types';

const initialState = {
  record: null,
  recordtError: null,
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
    default:
      return {
        ...state,
      };
  }
};
