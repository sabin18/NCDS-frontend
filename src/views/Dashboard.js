/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Main from '../components/main components/main';

export class Dashboard extends Component {
  render() {
    const { match } = this.props;
    const { businessId } = match.params;
    document.title = 'NCDS - Home';
    return (
      <div>
        <Main business={businessId} />
      </div>
    );
  }
}
Dashboard.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  businessId: PropTypes.string,
};

export default Dashboard;
