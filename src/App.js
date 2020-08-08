/* eslint-disable linebreak-style */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router, Switch, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <ProtectedRoute path="/" component={Dashboard} />
          <ProtectedRoute path="*" component={NotFound} />
        </Switch>
        <ToastContainer />
      </Router>
    );
  }
}

App.propTypes = {
};

export default withRouter(App);
