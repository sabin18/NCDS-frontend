/* eslint-disable linebreak-style */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router, Route, Switch, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Authentication from './views/authentication';
import AllMypharmacies from './views/AllMyPharmacies';

export class App extends Component {
  render() {
    // const { location: { pathname } } = this.props;
    return (
      <Router>
        <Switch>
          <ProtectedRoute exact path="/dashboard/:businessId" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/admin/users" component={Dashboard} />
          <Route path="/login" component={Authentication} />
          <Route path="/forgotpassword" component={Authentication} />
          <Route path="/resetpassword/:token" component={Authentication} />
          <Route path="/verify/:token" component={Authentication} />
          <ProtectedRoute exact path="/pharmacy" component={AllMypharmacies} />
          <ProtectedRoute exact path="/patient/:businessId/:patientId" component={Dashboard} />
          <ProtectedRoute exact path="/patients/:businessId" component={Dashboard} />
          <ProtectedRoute exact path="/patient/:businessId" component={Dashboard} />
          <ProtectedRoute exact path="/medications" component={Dashboard} />
          <ProtectedRoute exact path="/medication" component={Dashboard} />
          <ProtectedRoute exact path="/medicals" component={Dashboard} />
          <ProtectedRoute exact path="/diseases" component={Dashboard} />
          <ProtectedRoute exact path="/disease" component={Dashboard} />
          <ProtectedRoute exact path="/admin/pharmacies" component={Dashboard} />
          <ProtectedRoute exact path="/admin/pharmacy" component={Dashboard} />
          <ProtectedRoute exact path="/users" component={Dashboard} />
          <ProtectedRoute exact path="/employees" component={Dashboard} />
          <ProtectedRoute exact path="/employee" component={Dashboard} />
          <ProtectedRoute exact path="*" component={NotFound} />
        </Switch>
        <ToastContainer />
      </Router>
    );
  }
}

App.propTypes = {
};

export default withRouter(App);
