import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import authStyles from '../../styles/authStyles';
import SignIn from './login';
import ForgotPassword from './forgotPassword';

export class AuthPage extends Component {
  render() {
    const { classes, data } = this.props;
    return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Route path="/login">
         <SignIn />
        </Route>
        <Route path="/forgotpassword">
         <ForgotPassword />
        </Route>
        </div>
      </Grid>
    </Grid>
    );
  }
}

export default withStyles(authStyles)(AuthPage);
