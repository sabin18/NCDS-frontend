import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import { GetAllPatient, DeletePatient } from '../../actions/patientsActions';
import EnhancedTable from './patientsTable';
import TableLoader from '../main components/tableLoader';

export class AllPatients extends Component {
   state = {
     isLoading: false,
     search: '',
     open: false,
   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true });
     await props.GetAllPatient(props.businessId);
     this.setState({ isLoading: false });
   }

   handleSearch = (e) => {
     e.preventDefault();
     const { value } = e.target;
     this.setState({ search: value });
   };

   handleClickOpen = async () => {
     this.setState({ open: true });
   };

   handleDelete = async (selectId) => {
     const { props } = this;
     this.setState({ isLoading: true });
     const { businessId } = localStorage;
     await props.DeletePatient(businessId, selectId);
     await props.GetAllPatient(businessId);
     this.setState({ open: false, isLoading: false });

   };

   handleClose = () => {
     this.setState({ open: false });
   };

   render() {
     const { patient } = this.props;
     const { isLoading, search, open } = this.state;
     const patientsData = patient && patient.data;
     document.title = 'NCDS -Patients';
     return (
        <div>
          {isLoading ? <TableLoader /> : patientsData && patientsData
          && (
          <EnhancedTable
            data={patientsData}
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

AllPatients.propTypes = {
  GetAllPatient: PropTypes.func,
  DeletePatient: PropTypes.func,
  patient: PropTypes.object,
  businessId: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  patient: state.patient.patient,
  patientError: state.patient.patientError,
  deletePatient: state.patient.deletePatient,
  deletePatientError: state.patient.deletePatientError,
  status: state.patient.status,
});

export default compose(withRouter, connect(mapStateToProps, { GetAllPatient, DeletePatient }))(withStyles(pharmaStyles, LoaderStyles)(AllPatients));
