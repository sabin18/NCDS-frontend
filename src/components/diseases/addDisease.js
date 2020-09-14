/* eslint-disable no-nested-ternary */
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LoaderStyles from '../../styles/loaderStyles';
import addPatientStyles from '../../styles/addPatientStyles';
import addDiseaseStyles from '../../styles/addDiseaseStyles';
import { AddNewDisease, uploadDisease } from '../../actions/diseasesActions';
import Loader from '../main components/loader';

export class AddDisease extends Component {
   state = {
     open: false,
     name: '',
     file: '',

   };

   handleChange = (e) => {
     e.preventDefault();
     const { name, value } = e.target;
     this.setState({
       [name]: value,
     });
   };

   handleFileChange = (e) => {
     e.preventDefault();
     this.setState({ file: e.target.files[0] });
   };

     handleSubmit = async (e) => {
       e.preventDefault();
       const { name } = this.state;
       this.setState({ open: true });
       const { AddNewDisease } = this.props;
       await AddNewDisease(name);
       this.setState({
         open: false, name: '',
       });
     };

     handleSubmitFile = async (e) => {
       e.preventDefault();
       const { file } = this.state;
       this.setState({ open: true });
       const { uploadDisease } = this.props;
       const fileData = new FormData();
       fileData.append('file', file);
       await uploadDisease(fileData);
       this.setState({
         open: false, file: '',
       });
     };

     render() {
       const {
         classes,
       } = this.props;

       const { name, file, open } = this.state;
       document.title = 'NCDS - Add Disease';
       return (
       <div>
        <Grid item xs={12}>
        <Paper className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="on" onSubmit={this.handleSubmit}>
              <Typography variant="h5" gutterBottom className={classes.formTitle}>
                ADD NEW DISEASE
              </Typography>
              <Divider className={classes.diver} />
              <Typography variant="button" gutterBottom className={classes.addPatientContiner}>
                <b>DISEASE DETAILS</b>
              </Typography>
              <div>
                <TextField
                  id="standard-basic"
                  value={name}
                  onChange={(e) => this.handleChange(e)}
                  label="Disease Name"
                  name="name"
                />
                <Button
                  className={classes.addDiseaseButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={file ? true : open}
                  startIcon={<SaveIcon />}
                >
               {name ? open ? (
                <Loader
                  classes={classes}
                  onclick={this.handleClose}
                  open={file ? false : open}
                />
               ) : 'Save' : 'Save' }
                </Button>
                <Divider className={classes.diver} />
                <div className={classes.DiseaseContiner}>
                <Typography variant="button" gutterBottom className={classes.addPatientContiner}>
                <b>UPLOAD DISEASES FILE</b>
                </Typography>
                <TextField
                  type="file"
                  id="standard-basic"
                  onChange={(e) => this.handleFileChange(e)}
                  label="upload CSV file"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.addDiseaseButton}
                  disabled={file === '' || open}
                  onClick={this.handleSubmitFile}
                  startIcon={<CloudUploadIcon />}
                >
                {file ? open ? (
                <Loader
                  classes={classes}
                  onclick={this.handleClose}
                  open={name ? false : open}
                />
                ) : 'Upload' : 'Upload'}
                </Button>
                </div>
              </div>
        </form>
        </Paper>
        </Grid>
       </div>
       );
     }
}

AddDisease.propTypes = {
  AddNewDisease: PropTypes.func,
  classes: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  addDiseases: state.disease.addDiseases,
  addDiseasesError: state.disease.addDiseasesError,
  uploadDiseases: state.disease.uploadDiseases,
  uploadDiseasesError: state.disease.uploadDiseasesError,

});

export default compose(withRouter, connect(mapStateToProps, { AddNewDisease, uploadDisease }))(withStyles(addPatientStyles, LoaderStyles, addDiseaseStyles)(AddDisease));
