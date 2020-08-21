import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import patientReducer from './patientReducer';

export default combineReducers({
  auth: authReducer,
  pharmacy: businessReducer,
  patient: patientReducer,

});
