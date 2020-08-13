

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import AuthPage from '../components/auth/authPage';

export class Authentication extends Component {
  render() {
    return (
      <div>
        <AuthPage />
      </div>
    );
  }
}

export default Authentication;
