/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthPage from '../components/auth/authPage';

export class Authentication extends Component {

  render() {
    const { match } = this.props;
    const { token } = match.params;
    return (
      <div>
        <AuthPage token={token} />
      </div>
    );
  }
}
Authentication.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  token: PropTypes.string,
};
export default Authentication;
