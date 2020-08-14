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
import Copyright from './copyright';
import authStyles from '../../styles/authStyles';

export class ForgotPassword extends Component {

   state = {
     email: '',
   };

   handleChange = (e) => {
     e.preventDefault();
     const { name, value } = e.target;
     this.setState({
       [name]: value,
     });
   };

   render() {
     const { classes } = this.props;
     const { email } = this.state;
     document.title = 'NCDS - reset password';
     return (
        <div className={classes.paper}>
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
};

export const mapStateToProps = (state) => ({
  data: state.auth.data,
  dataError: state.auth.dataError,
  status: state.auth.status,
});

export default compose(withRouter, connect(mapStateToProps, {}))(withStyles(authStyles)(ForgotPassword));
