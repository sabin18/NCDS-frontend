import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import patientReducer from './patientReducer';
import diseasesReducer from './diseasesReducer';
import medicationsReducer from './medicationsReducer';
import medicalRecordReducer from './medicalRecordReducer';
import usersReducer from './usersReducer';
import rolesReducer from './rolesReducer';
import employeeaReducer from './employeeReducer';

export default combineReducers({
  auth: authReducer,
  pharmacy: businessReducer,
  patient: patientReducer,
  disease: diseasesReducer,
  medication: medicationsReducer,
  record: medicalRecordReducer,
  user: usersReducer,
  role: rolesReducer,
  employee: employeeaReducer,

});
