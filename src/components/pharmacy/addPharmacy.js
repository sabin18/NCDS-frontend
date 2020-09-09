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
import { AddBusiness } from '../../actions/pharmacyActions';
import Loader from '../main components/loader';

export class AddPharmacy extends Component {
   state = {
     open: false,
     name: '',
     ownerEmail: '',
     district: '',
     sector: '',
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
       const { name, ownerEmail, district, sector } = this.state;
       this.setState({ open: true });
       const { AddBusiness } = this.props;
       const PharmacyData = {
         name,
         ownerEmail,
         district,
         sector,
       };
       await AddBusiness(PharmacyData);
       this.setState({
         open: false, name: '', ownerEmail: '', district: '', sector: '',
       });
     };

     render() {
       const {
         classes,
       } = this.props;
       const { name, ownerEmail, district, sector, open } = this.state;
       document.title = 'NCDS - Add Pharmacy';
       return (
       <div>
        <Grid item xs={12}>
        <Paper className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="on" onSubmit={this.handleSubmit}>
              <Typography variant="h5" gutterBottom className={classes.formTitle}>
                ADD NEW Pharmacy
              </Typography>
              <Divider className={classes.diver} />
              <Typography variant="button" gutterBottom className={classes.addPatientContiner}>
                <b>Pharmacy DETAILS</b>
              </Typography>
              <div>
                <TextField
                  id="standard-basic"
                  value={name}
                  onChange={(e) => this.handleChange(e)}
                  label="Pharmacy name"
                  name="name"
                />
                <TextField
                  id="standard-basic"
                  value={ownerEmail}
                  onChange={(e) => this.handleChange(e)}
                  label="Owner Email"
                  name="ownerEmail"
                />
                <TextField
                  id="standard-basic"
                  value={district}
                  onChange={(e) => this.handleChange(e)}
                  label="District"
                  name="district"
                />
                <TextField
                  id="standard-basic"
                  value={sector}
                  onChange={(e) => this.handleChange(e)}
                  label="Sector"
                  name="sector"
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

AddPharmacy.propTypes = {
  AddBusiness: PropTypes.func,
  classes: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  addPharmacies: state.pharmacy.addBusiness,
  addPharmaciesError: state.pharmacy.addBusinessError,

});

export default compose(withRouter, connect(mapStateToProps, { AddBusiness }))(withStyles(addPatientStyles, LoaderStyles)(AddPharmacy));
