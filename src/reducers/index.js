import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import patientReducer from './patientReducer';
import diseasesReducer from './diseasesReducer';
import medicationsReducer from './medicationsReducer';
import medicalRecordReducer from './medicalRecordReducer';
import usersReducer from './usersReducer';
import rolesReducer from './rolesReducer';
import employeeReducer from './employeeReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  auth: authReducer,
  pharmacy: businessReducer,
  patient: patientReducer,
  disease: diseasesReducer,
  medication: medicationsReducer,
  record: medicalRecordReducer,
  user: usersReducer,
  role: rolesReducer,
  employee: employeeReducer,
  notification: notificationReducer,

});
