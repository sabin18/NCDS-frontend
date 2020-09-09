import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import { AllBusiness } from '../../actions/pharmacyActions';
import EnhancedTable from './pharmacyTable';
import TableLoader from '../main components/tableLoader';

export class AllPharmacies extends Component {
   state = {
     isLoading: false,
     search: '',
   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true });
     await props.AllBusiness();
     this.setState({ isLoading: false });
   }

   handleSearch = (e) => {
     e.preventDefault();
     const { value } = e.target;
     this.setState({ search: value });
   };

   render() {
     const { allPharmacies } = this.props;
     const { isLoading, search } = this.state;
     const pharmaciesData = allPharmacies && allPharmacies.data;
     document.title = 'NCDS -Pharmcies';
     return (
        <div>
          {isLoading ? <TableLoader /> : pharmaciesData && pharmaciesData
          && (
          <EnhancedTable
            data={pharmaciesData}
            search={search}
            searching={this.searching}
            handleSearch={this.handleSearch}
          />
          )}
        </div>
     );
   }
}

AllPharmacies.propTypes = {
  AllBusiness: PropTypes.func,
  allPharmacies: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  allPharmacies: state.pharmacy.allBusiness,
  allPharmaciesError: state.pharmacy.allBusinessError,
});

export default compose(withRouter, connect(mapStateToProps, { AllBusiness }))(withStyles(pharmaStyles, LoaderStyles)(AllPharmacies));
