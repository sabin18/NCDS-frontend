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
import LoaderStyles from '../../styles/loaderStyles';
import addMedicalStyles from '../../styles/addMedicalRecordStyles';
import { GetSinglePatient } from '../../actions/patientsActions';
import { GetAllDiseases } from '../../actions/diseasesActions';
import { GetAllMedications } from '../../actions/medicationActions';

export class AddMedicalRecords extends Component {
   state = {
     isLoading: false,
   };

   async componentDidMount() {
     const { props } = this;
     const { match } = props;
     const { patientId, businessId } = match.params;
     this.setState({ isLoading: true });
     await props.GetSinglePatient(businessId, patientId);
     await props.GetAllDiseases();
     await props.GetAllMedications();
     this.setState({ isLoading: false });
   }

   render() {
     const {
       singlePatient, diseases, medications, classes,
     } = this.props;
     const { isLoading } = this.state;
     const patientData = singlePatient && singlePatient.data;
     const diseasesData = diseases && diseases.data;
     const medicationsData = medications && medications.data;
     const diseasesList = diseasesData && diseasesData.map((item) => item.name);
     const medicationsList = medicationsData && medicationsData.map((item) => item.name);

     document.title = 'NCDS -Patients';
     return (
       <div ClassName={classes.addPatientContiner}>
          { patientData
         && (
        <form className={classes.root} noValidate autoComplete="on">
              <Typography variant="h3" gutterBottom>
                Create Medical Record for this Patient
              </Typography>
              <div>
              <Typography variant="h6" gutterBottom>
                PATIENT DETAILS
              </Typography>
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
              <Typography variant="h6" gutterBottom>
                ADD MEDICAL DETAILS
              </Typography>
              <div styles={{ display: 'inlineBlock' }}>
              <Autocomplete
                id="auto-highlight"
                autoHighlight
                options={diseasesList && diseasesList}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select Disease" />}
              />
              <Autocomplete
                id="auto-highlight"
                autoHighlight
                options={medicationsList && medicationsList}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select Medication" />}
              />
              <TextField
                id="standard-number"
                label="Quantity"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Autocomplete
                id="auto-highlight"
                autoHighlight
                options={['Tablets(Tbs)', 'Flacons(FI)', 'Tubes(Tbes)', 'Pieces(Pces)']}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Quantity Types" />}
              />
              <TextField
                id="date"
                label="ExpiryDate"
                type="date"
                defaultValue={new Date()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </div>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<AddIcon />}
              >
                Add New Medication
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
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
});

export default compose(withRouter, connect(mapStateToProps, { GetSinglePatient, GetAllDiseases, GetAllMedications }))(withStyles(addMedicalStyles)(AddMedicalRecords));
