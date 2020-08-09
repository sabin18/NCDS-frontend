/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Main from '../components/main components/main';

export class Dashboard extends Component {
  render() {
    document.title = 'NCDS - Home';
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default Dashboard;
