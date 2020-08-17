/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PrimarySearchAppBar from '../components/main components/menu';
import AllMypharmacy from '../components/pharmacy/MyPharmacies';

export class AllMypharmacies extends Component {
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <AllMypharmacy />
      </div>
    );
  }
}

export default AllMypharmacies;
