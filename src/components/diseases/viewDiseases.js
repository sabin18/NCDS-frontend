import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import { GetAllDiseases } from '../../actions/diseasesActions';
import EnhancedTable from './diseasesTable';
import TableLoader from '../main components/tableLoader';

export class AllDiseases extends Component {
   state = {
     isLoading: false,
     search: '',
   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true });
     await props.GetAllDiseases();
     this.setState({ isLoading: false });
   }

   handleSearch = (e) => {
     e.preventDefault();
     const { value } = e.target;
     this.setState({ search: value });
   };

   render() {
     const { diseases } = this.props;
     const { isLoading, search } = this.state;
     const diseasesData = diseases && diseases.data;
     document.title = 'NCDS -diseases';
     return (
        <div>
          {isLoading ? <TableLoader /> : diseasesData && diseasesData
          && (
          <EnhancedTable
            data={diseasesData}
            search={search}
            searching={this.searching}
            handleSearch={this.handleSearch}
          />
          )}
        </div>
     );
   }
}

AllDiseases.propTypes = {
  GetAllDiseases: PropTypes.func,
  diseases: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  diseases: state.disease.diseases,
  diseasesError: state.disease.diseasesError,
});

export default compose(withRouter, connect(mapStateToProps, { GetAllDiseases }))(withStyles(pharmaStyles, LoaderStyles)(AllDiseases));
