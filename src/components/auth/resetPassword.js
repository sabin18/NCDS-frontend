import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Copyright from './copyright';
import authStyles from '../../styles/authStyles';
import { resetPasword } from '../../actions/authActions';

export class ResetPassword extends Component {
   state = {
     newPassword: '',
     confirmPassword: '',
     open: false,
     alert: false,
   };

   handleClose = () => {
     this.setState({ open: false });
   };

   handleHide = () => {
     this.setState({ alert: false });
   }

 handleSubmit = async (e) => {
   e.preventDefault();
   const { props, state } = this;
   const { token } = props;
   this.setState({ isLoading: true, open: true, alert: false });
   await props.resetPasword(state.newPassword, state.confirmPassword, token);
   this.setState({ isLoading: false, open: false, newPassword: '', confirmPassword: '', alert: true,
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
     const { classes, data, dataError} = this.props;
     const { newPassword, confirmPassword, isLoading, open, alert } = this.state;
     document.title = 'NCDS - reset password';
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
           {data && data.message && <Redirect to="/login" />}
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={this.handleChange}
            name="newPassword"
            value={newPassword}
            label="new password"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={this.handleChange}
              name="confirmPassword"
              value={confirmPassword}
              label="confirm password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              submit
            </Button>
            {dataError && dataError.Error && (
            <Collapse in={alert}>
                <Alert
                  variant="filled" 
                  severity="error"
                  action={(
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={this.handleHide}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  )}
                >
                  {Array.isArray(dataError.Error)
                    ? dataError.Error[0] : dataError.Error}
                </Alert>
            </Collapse>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Request New Link?
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

ResetPassword.propTypes = {
  classes: PropTypes.object,
  resetPasword: PropTypes.func,
  data: PropTypes.object,
  token: PropTypes.string,
  dataError: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  data: state.auth.data,
  dataError: state.auth.dataError,
  status: state.auth.status,
});

export default compose(withRouter, connect(mapStateToProps, { resetPasword }))(withStyles(authStyles)(ResetPassword));
