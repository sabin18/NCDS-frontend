import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import patientReducer from './patientReducer';
import diseasesReducer from './diseasesReducer';
import medicationsReducer from './medicationsReducer';
import medicalRecordReducer from './medicalRecordReducer';

export default combineReducers({
  auth: authReducer,
  pharmacy: businessReducer,
  patient: patientReducer,
  disease: diseasesReducer,
  medication: medicationsReducer,
  record: medicalRecordReducer,

});
