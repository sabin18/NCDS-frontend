import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import { GetAllMedicalRecords } from '../../actions/medicationRecordActions';
import EnhancedTable from './MedicalRecordsTable';
import TableLoader from '../main components/tableLoader';

export class AllMedicalRecords extends Component {
   state = {
     isLoading: false,
     search: '',
   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true });
     const { businessId } = localStorage;
     await props.GetAllMedicalRecords(businessId);
     this.setState({ isLoading: false });
   }

   handleSearch = (e) => {
     e.preventDefault();
     const { value } = e.target;
     this.setState({ search: value });
   };

   render() {
     const { records } = this.props;
     const { isLoading, search } = this.state;
     const recordsData = records && records.data;
     document.title = 'NCDS Medical Records';
     return (
        <div>
          {isLoading ? <TableLoader /> : recordsData && recordsData
          && (
          <EnhancedTable
            data={recordsData}
            search={search}
            searching={this.searching}
            handleSearch={this.handleSearch}
          />
          )}
        </div>
     );
   }
}

AllMedicalRecords.propTypes = {
  GetAllMedicalRecords: PropTypes.func,
  records: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  records: state.record.allRecords,
  recordsError: state.record.allRecordsError,
});

export default compose(withRouter, connect(mapStateToProps, { GetAllMedicalRecords }))(withStyles(pharmaStyles, LoaderStyles)(AllMedicalRecords));
