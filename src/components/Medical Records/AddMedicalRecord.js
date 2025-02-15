import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import LoaderStyles from '../../styles/loaderStyles';
import addMedicalStyles from '../../styles/addMedicalRecordStyles';
import { GetSinglePatient } from '../../actions/patientsActions';
import { GetAllDiseases } from '../../actions/diseasesActions';
import { GetAllMedications } from '../../actions/medicationActions';
import { createMedicalRecord } from '../../actions/medicationRecordActions';
import FormLoader from '../main components/formLoader';
import Loader from '../main components/loader';

export class AddMedicalRecords extends Component {
   state = {
     isLoading: false,
     open: false,
     medicalRecords: [],
   };

   async componentDidMount() {
     const { props } = this;
     const { match } = props;
     const { patientId, businessId } = match.params;
     this.setState({ isLoading: true });
     await props.GetSinglePatient(businessId, patientId);
     await props.GetAllDiseases();
     await props.GetAllMedications();
     const medicalData = [{
       patient: patientId,
       quantity: '',
       disease: '',
       medication: '',
       quantityType: '',
       expiryDate: '',
     }];
     this.setState({ medicalRecords: medicalData });
     this.setState({ isLoading: false });
   }

   handleClose = () => {
     this.setState({ open: false, isLoading: false });
   };

   addNewRecord = async () => {
     const { medicalRecords } = this.state;
     const { match } = this.props;
     const { patientId } = match.params;
     const medicalData = {
       patient: patientId,
       quantity: '',
       disease: '',
       medication: '',
       quantityType: '',
       expiryDate: '',
     };

     await this.setState({
       medicalRecords: medicalRecords.concat(medicalData),
     });
   }

   removeRecord = async (key) => {
     const { medicalRecords } = this.state;
     const newRecord = medicalRecords;
     await newRecord.splice(key, 1);
     this.setState({
       medicalRecords: newRecord,
     });
   }

   handleSubmit = async (e) => {
     e.preventDefault();
     const { medicalRecords } = this.state;
     this.setState({ open: true });
     const { createMedicalRecord, match } = this.props;
     const { businessId, patientId } = match.params;
     const medicalData = [{
       patient: patientId,
       quantity: '',
       disease: '',
       medication: '',
       quantityType: '',
       expiryDate: '',
     }];
     await createMedicalRecord(businessId, medicalRecords);
     this.setState({
       open: false, medicalRecords: medicalData,
     });
   };

   handleMedicalRecordChange(e) {
     e.preventDefault();
     const keys = e.target.id.split('-');
     const temp = this.state.medicalRecords;
     temp[parseInt(keys[1])][keys[0]] = e.target.value;
     this.setState({ medicalRecords: temp });
   }

   render() {
     const {
       singlePatient, diseases, medications, classes,
     } = this.props;
     const { isLoading, medicalRecords, open } = this.state;
     const patientData = singlePatient && singlePatient.data;
     const diseasesData = diseases && diseases.data;
     const medicationsData = medications && medications.data;
     const diseasesList = diseasesData && diseasesData.map((item) => item.name);
     const medicationsList = medicationsData && medicationsData.map((item) => item.name);

     document.title = 'NCDS -Patients';
     return (
       <div className={classes.Recordform}>
          {isLoading ? <FormLoader /> : patientData
         && (
        <form className={classes.root} noValidate autoComplete="on" onSubmit={this.handleSubmit}>
              <Typography variant="h5" gutterBottom className={classes.formTitle}>
                CREATE MEDICAL RECORD FOR THIS PATIENT
              </Typography>
              <Divider className={classes.diver} />
              <Typography variant="button" gutterBottom>
                <b>PATIENT DETAILS</b>
              </Typography>
              <div>
                <TextField
                  id="standard-read-only-input"
                  label="firstName"
                  defaultValue={patientData.firstName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="standard-read-only-input"
                  label="LastName"
                  defaultValue={patientData && patientData.lastName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="standard-read-only-input"
                  label="Phone Number"
                  defaultValue={patientData.phone}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <Typography variant="button" gutterBottom>
              <b>ADD MEDICATION DETAILS</b>
              </Typography>
              {medicalRecords && medicalRecords.map((record, index) => (
              <div className={classes.addPatientContiner} key={record.id}>
              <Tooltip title="Remove Medication">
                  <IconButton
                    aria-label="Remove Medication"
                    onClick={() => this.removeRecord(index)}
                  >
                  <DeleteIcon />
                  </IconButton>
              </Tooltip>
              <Autocomplete
                autoHighlight
                id={`disease-${index}`}
                value={record.disease}
                name={`disease-${index}`}
                options={diseasesList && diseasesList}
                onSelect={(e) => this.handleMedicalRecordChange(e)}
                renderInput={(params) => <TextField {...params} label="Select Disease" />}
              />
              <Autocomplete
                autoHighlight
                value={record.medication}
                name={`medication-${index}`}
                id={`medication-${index}`}
                options={medicationsList && medicationsList}
                onSelect={(e) => this.handleMedicalRecordChange(e)}
                renderInput={(params) => <TextField {...params} label="Select Medication" />}
              />
              <TextField
                id="standard-number"
                label="Quantity"
                type="number"
                value={record.quantity}
                onChange={(e) => this.handleMedicalRecordChange(e)}
                name={`quantity-${index}`}
                id={`quantity-${index}`}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Autocomplete
                autoHighlight
                value={record.quantityType}
                name={`quantityType-${index}`}
                id={`quantityType-${index}`}
                options={['Tablets(Tbs)', 'Flacons(FI)', 'Tubes(Tbes)', 'Pieces(Pces)']}
                onSelect={(e) => this.handleMedicalRecordChange(e)}
                renderInput={(params) => <TextField {...params} label="Quantity Types" />}
              />
              <TextField
                label="ExpiryDate"
                type="date"
                value={record.expiryDate}
                onChange={(e) => this.handleMedicalRecordChange(e)}
                name={`expiryDate-${index}`}
                id={`expiryDate-${index}`}
                defaultValue={new Date()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </div>
              ))}
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={() => this.addNewRecord()}
              >
                Add New Medication
              </Button>

              <Button
                type="submit"
                style={{ left: '920px' }}
                variant="contained"
                color="primary"
                size="large"
                disabled={open}
                className={classes.button}
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

        </form>
         )}
       </div>
     );
   }
}

AddMedicalRecords.propTypes = {
  GetSinglePatient: PropTypes.func,
  GetAllMedications: PropTypes.func,
  GetAllDiseases: PropTypes.func,
  singlePatient: PropTypes.object,
  createmedicalRecord: PropTypes.object,
  medications: PropTypes.object,
  diseases: PropTypes.object,
  businessId: PropTypes.string,
  classes: PropTypes.object,
  match: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  singlePatient: state.patient.singlePatient,
  singlepatientError: state.patient.singlePatientError,
  diseases: state.disease.diseases,
  diseasesError: state.disease.diseasesError,
  medications: state.medication.medications,
  medicationsError: state.medication.medicationsError,
  records: state.record.record,
  recordsError: state.record.recordError,
});

export default compose(withRouter, connect(mapStateToProps, {
  GetSinglePatient, GetAllDiseases, GetAllMedications, createMedicalRecord,
}))(withStyles(addMedicalStyles, LoaderStyles)(AddMedicalRecords));
