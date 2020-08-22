import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import authStyles from '../../styles/authStyles';
import Copyright from '../copyright';
import { userLogin } from '../../actions/authActions';
import isOnline from '../../helpers/checkInternet';

export class SignIn extends Component {
   state = {
     email: '',
     password: '',
     isLoading: false,
     open: false,
   };

    handleClose = () => {
      this.setState({ open: false, isLoading: false });
    };

   handleSubmit = async (e) => {
     e.preventDefault();
     const { email, password } = this.state;
     const credentials = {
       email,
       password,
     };
     this.setState({ isLoading: true, open: true });
     const { userLogin: login } = this.props;
     await login(credentials);
     this.setState({
       isLoading: false, open: false, email: '', password: '',
     });
   };

   handleChange = (e) => {
     e.preventDefault();
     const { name, value } = e.target;
     this.setState({
       [name]: value,
     });
   };

   render() {
     const { classes, data, history} = this.props;
     const {
       password, email, isLoading, open,
     } = this.state;
     document.title = 'NCDS - Sign In';
     return (
        <div className={classes.paper}>
         {isLoading && (
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={this.handleClose}
        >
       <CircularProgress className={classes.buttonProgress} />
        </Backdrop>
         )}
          {data && data.message && history.push('/pharmacy')}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleChange}
              value={email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={this.handleChange}
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
     );
   }
}

SignIn.propTypes = {
  userLogin: PropTypes.func,
  data: PropTypes.object,
  classes: PropTypes.object,
  dataError: PropTypes.object,
  history: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
};

export const mapStateToProps = (state) => ({
  data: state.auth.data,
  dataError: state.auth.dataError,
  status: state.auth.status,
});

export default compose(withRouter, connect(mapStateToProps, { userLogin }))(withStyles(authStyles)(SignIn));
