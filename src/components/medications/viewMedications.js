import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import { GetAllMedications } from '../../actions/medicationActions';
import EnhancedTable from './medicationsTable';
import TableLoader from '../main components/tableLoader';

export class AllMedications extends Component {
   state = {
     isLoading: false,
     search: '',
   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true });
     await props.GetAllMedications();
     this.setState({ isLoading: false });
   }

   handleSearch = (e) => {
     e.preventDefault();
     const { value } = e.target;
     this.setState({ search: value });
   };

   render() {
     const { medications } = this.props;
     const { isLoading, search } = this.state;
     const medicationsData = medications && medications.data;
     document.title = 'NCDS -medications';
     return (
        <div>
          {isLoading ? <TableLoader /> : medicationsData && medicationsData
          && (
          <EnhancedTable
            data={medicationsData}
            search={search}
            searching={this.searching}
            handleSearch={this.handleSearch}
          />
          )}
        </div>
     );
   }
}

AllMedications.propTypes = {
  GetAllMedications: PropTypes.func,
  medications: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  medications: state.medication.medications,
  medicationsError: state.medication.medicationsError,
});

export default compose(withRouter, connect(mapStateToProps, { GetAllMedications }))(withStyles(pharmaStyles, LoaderStyles)(AllMedications));
