import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import { GetAllEmployee, DeleteEmployee } from '../../actions/employeeActions';
import EnhancedTable from './employeeTable';
import TableLoader from '../main components/tableLoader';

export class AllEmployee extends Component {
   state = {
     isLoading: false,
     search: '',
     open: false,
   };

   async componentDidMount() {
     const { props } = this;
     const { businessId } = localStorage;
     this.setState({ isLoading: true });
     await props.GetAllEmployee(businessId);
     this.setState({ isLoading: false });
   }

   handleSearch = (e) => {
     e.preventDefault();
     const { value } = e.target;
     this.setState({ search: value });
   };

   handleClickOpen = async () => {
     console.log('======>click');
     this.setState({ open: true });
   };

  handleDelete = async (selectId) => {
    const { props } = this;
    this.setState({ isLoading: true });
    const { businessId } = localStorage;
    console.log('======>delete');
    await props.DeleteEmployee(businessId, selectId);
    await props.GetAllEmployee(businessId);
    this.setState({ open: false, isLoading: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { employees } = this.props;
    const { isLoading, search, open } = this.state;
    const employeeData = employees && employees.data;
    document.title = 'NCDS -employee';
    return (
        <div>
          {isLoading ? <TableLoader /> : employeeData && employeeData
          && (
          <EnhancedTable
            data={employeeData}
            search={search}
            searching={this.searching}
            handleSearch={this.handleSearch}
            handleClickOpen={this.handleClickOpen}
            open={open}
            handleClose={this.handleClose}
            handleDelete={this.handleDelete}
          />
          )}
        </div>
    );
  }
}

AllEmployee.propTypes = {
  GetAllEmployee: PropTypes.func,
  employees: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  employees: state.employee.employees,
  employeesError: state.employee.employeesError,
  status: state.employee.status,
});

export default compose(withRouter, connect(mapStateToProps, { GetAllEmployee, DeleteEmployee }))(withStyles(pharmaStyles, LoaderStyles)(AllEmployee));
