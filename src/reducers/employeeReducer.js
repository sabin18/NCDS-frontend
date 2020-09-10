import { GET_EMPLOYEE_SUCCESS, GET_EMPLOYEE_ERROR, ADD_EMPLOYEE_SUCCESS, ADD_EMPLOYEE_ERROR } from '../actions/types';

const initialState = {
  employees: null,
  employeesError: null,
  addEmployees: null,
  addEmployeesError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        employeesError: null,
        status: 'Success',
      };
    case GET_EMPLOYEE_ERROR:
      return {
        ...state,
        employees: null,
        employeesError: action.payload,
        status: 'Failure',
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        addEmployees: action.payload,
        addEmployeesError: null,
        status: 'Success',
      };
    case ADD_EMPLOYEE_ERROR:
      return {
        ...state,
        addEmployees: null,
        addEmployeesError: action.payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
