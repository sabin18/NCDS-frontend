import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LoaderStyles from '../../styles/loaderStyles';
import addPatientStyles from '../../styles/addPatientStyles';
import { AddNewPatient } from '../../actions/patientsActions';
import Loader from '../main components/loader';

export class AddPatient extends Component {
   state = {
     open: false,
     firstName: '',
     lastName: '',
     phone: '',
     email: '',

   };

   handleChange = (e) => {
     e.preventDefault();
     const { name, value } = e.target;
     this.setState({
       [name]: value,
     });
   };

      handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, phone, email } = this.state;
        this.setState({ open: true });
        const { AddNewPatient, match } = this.props;
        const { businessId } = match.params;
        const patientData = {
          firstName,
          lastName,
          phone,
          email,
        };
        const patientDataNoEmail = {
          firstName,
          lastName,
          phone,
        };
        await AddNewPatient(businessId, email === '' ? patientDataNoEmail : patientData);
        this.setState({
          open: false, firstName: '', lastName: '', phone: '', email: '',
        });
      };

      render() {
        const {
          classes,
        } = this.props;
        const { firstName, lastName, phone, email, open } = this.state;
        document.title = 'NCDS - Add Patient';
        return (
       <div>
        <Grid item xs={12}>
        <Paper className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="on" onSubmit={this.handleSubmit}>
              <Typography variant="h5" gutterBottom className={classes.formTitle}>
                ADD NEW PATIENT
              </Typography>
              <Divider className={classes.diver} />
              <Typography variant="button" gutterBottom className={classes.addPatientContiner}>
                <b>PATIENT DETAILS</b>
              </Typography>
              <div>
                <TextField
                  id="standard-basic"
                  value={firstName}
                  onChange={(e) => this.handleChange(e)}
                  label="FirstName"
                  name="firstName"
                />
                <TextField
                  id="standard-basic"
                  value={lastName}
                  onChange={(e) => this.handleChange(e)}
                  label="LastName"
                  name="lastName"
                />
                <TextField
                  id="standard-basic"
                  value={phone}
                  onChange={(e) => this.handleChange(e)}
                  label="Phone Number"
                  name="phone"
                />
                <TextField
                  id="standard-basic"
                  value={email}
                  onChange={(e) => this.handleChange(e)}
                  label="Email"
                  name="email"
                />
              </div>
              <div className={classes.addPatientButton}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={open}
                startIcon={<SaveIcon />}
              >
               {open ? (
                <Loader
                  classes={classes}
                  onclick={this.handleClose}
                  open={open}
                />
               ) : 'Save' }
              </Button>
              </div>
        </form>
        </Paper>
        </Grid>
       </div>
        );
      }
}

AddPatient.propTypes = {
  AddNewPatient: PropTypes.func,
  classes: PropTypes.object,
  businessId: PropTypes.string,
  match: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  addPatient: state.patient.AddPatient,
  addPatientError: state.patient.AddPatientError,

});

export default compose(withRouter, connect(mapStateToProps, { AddNewPatient }))(withStyles(addPatientStyles, LoaderStyles)(AddPatient));
