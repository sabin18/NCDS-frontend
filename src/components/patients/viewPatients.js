import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import { GetAllPatient } from '../../actions/patientsActions';
import EnhancedTable from './patientsTable';
import PatientLoader from './patientsLoader';

export class AllPatients extends Component {
   state = {
     isLoading: false,
   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true });
     await props.GetAllPatient(props.businessId);
     this.setState({ isLoading: false });
   }

   render() {
     const { patient } = this.props;
     const { isLoading } = this.state;
     const patientsData = patient && patient.data;
     document.title = 'NCDS -Patients';
     return (
        <div>
          {isLoading ? <PatientLoader /> : patientsData && patientsData && <EnhancedTable data={patientsData} />}
        </div>
     );
   }
}

AllPatients.propTypes = {
  GetAllPatient: PropTypes.func,
  patient: PropTypes.object,
  businessId: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  patient: state.patient.patient,
  patientError: state.patient.patientError,
  status: state.patient.status,
});

export default compose(withRouter, connect(mapStateToProps, { GetAllPatient }))(withStyles(pharmaStyles, LoaderStyles)(AllPatients));
