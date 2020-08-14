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

export class App extends Component {
  render() {
    // const { location: { pathname } } = this.props;
    return (
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={Authentication} />
          <Route path="/forgotpassword" component={Authentication} />
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
