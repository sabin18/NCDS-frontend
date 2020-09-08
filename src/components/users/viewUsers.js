import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import { GetAllUsers } from '../../actions/usersAction';
import EnhancedTable from './usersTable';
import TableLoader from '../main components/tableLoader';

export class AllUsers extends Component {
   state = {
     isLoading: false,
     search: '',
   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true });
     await props.GetAllUsers(props.businessId);
     this.setState({ isLoading: false });
   }

   handleSearch = (e) => {
     e.preventDefault();
     const { value } = e.target;
     this.setState({ search: value });
   };

   render() {
     const { users } = this.props;
     const { isLoading, search } = this.state;
     const usersData = users && users.data;
     document.title = 'NCDS -users';
     return (
        <div>
          {isLoading ? <TableLoader /> : usersData && usersData
          && (
          <EnhancedTable
            data={usersData}
            search={search}
            searching={this.searching}
            handleSearch={this.handleSearch}
          />
          )}
        </div>
     );
   }
}

AllUsers.propTypes = {
  GetAllUsers: PropTypes.func,
  users: PropTypes.object,
  businessId: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  users: state.user.users,
  usersError: state.user.usersError,
  status: state.user.status,
});

export default compose(withRouter, connect(mapStateToProps, { GetAllUsers }))(withStyles(pharmaStyles, LoaderStyles)(AllUsers));
