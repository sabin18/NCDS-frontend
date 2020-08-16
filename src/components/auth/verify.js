import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Copyright from './copyright';
import authStyles from '../../styles/authStyles';
import { VerifyUsers } from '../../actions/authActions';

export class VerifyUser extends Component {
   state = {
     open: false,
   };

   async componentDidMount() {
     const { props } = this;
     const { token } = props;
     this.setState({ isLoading: true, open: true });
     await props.VerifyUsers(token);
     this.setState({ isLoading: false, open: false });
   }

 handleClose = () => {
   this.setState({ open: false });
 };

 render() {
   const { classes, verify, verifyError } = this.props;
   const { isLoading, open } = this.state;
   document.title = 'NCDS - Account verification';
   return (
        <div className={classes.paper}>
          {isLoading && (
    <h2>
    Verification in Progress...
    <br />
    Please Wait...
    <br />
    <br />
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={this.handleClose}
        >
       <CircularProgress className={classes.buttonProgress} />
        </Backdrop>
    </h2>
          )}
          { (verify || verifyError) && <Redirect to="/login" />}
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
   );
 }
}

VerifyUser.propTypes = {
  classes: PropTypes.object,
  VerifyUsers: PropTypes.func,
  verify: PropTypes.object,
  verifyError: PropTypes.object,
  token: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  verify: state.auth.verify,
  verifyError: state.auth.verifyError,
  status: state.auth.status,
});

export default compose(withRouter, connect(mapStateToProps, { VerifyUsers }))(withStyles(authStyles)(VerifyUser));
