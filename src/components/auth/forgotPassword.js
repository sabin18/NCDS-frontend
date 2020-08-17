import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Copyright from '../copyright';
import authStyles from '../../styles/authStyles';
import { resetPaswordRequest } from '../../actions/authActions';

export class ForgotPassword extends Component {
   state = {
     email: '',
     open: false,
     alert: false,
   };

   handleClose = () => {
     this.setState({ open: false });
   };

   handleHide = () =>{
     this.setState({ alert: false });
   }

 handleSubmit = async (e) => {
   e.preventDefault();
   const { props, state } = this;
   this.setState({ isLoading: true, open: true });
   await props.resetPaswordRequest(state.email);
   this.setState({
     isLoading: false, open: false, email: '', alert: true,
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
     const { classes, data } = this.props;
     const { email, isLoading, open, alert } = this.state;
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
          <Typography component="h1" variant="h5">
            Get link to reset password
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              submit
            </Button>
            {data && data.message && (
            <Collapse in={alert}>
                <Alert
                  variant="filled"
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
                  {data.message}
                </Alert>
            </Collapse>
            )}
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
     );
   }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object,
  resetPaswordRequest: PropTypes.func,
  data: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  data: state.auth.data,
  dataError: state.auth.dataError,
  status: state.auth.status,
});

export default compose(withRouter, connect(mapStateToProps, { resetPaswordRequest }))(withStyles(authStyles)(ForgotPassword));
