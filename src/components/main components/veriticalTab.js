/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter, Link } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TabPanel from './tabPanel';
import LoaderStyles from '../../styles/loaderStyles';
import VerticalTabStyles from '../../styles/veriticalTab';
import { checkAdmin } from '../../helpers/authHelpers';
import AllPatients from '../patients/viewPatients';
import AddPatient from '../patients/addPatient';
import AddMedicalRecords from '../Medical Records/AddMedicalRecord';
import AllUsers from '../users/viewUsers';
import AddUser from '../users/addUser';
import AllPharmacies from '../pharmacy/viewPharmacies';
import AddPharmacy from '../pharmacy/addPharmacy';
import AllEmployee from '../employee/viewEmployee';
import AddEmployee from '../employee/addEmployee';
import AllDiseases from '../diseases/viewDiseases';
import AddDisease from '../diseases/addDisease';
import AllMedications from '../medications/viewMedications';
import AddMedication from '../medications/addMedications';
import AllMedicalRecords from '../Medical Records/viewMedicalRecord';

const a11yProps = (index) => ({
  id: `vertical-tab-${index}`,
  'aria-controls': `vertical-tabpanel-${index}`,
});

const VerticalTabs = (props) => {
  const classes = VerticalTabStyles();
  const [value, setValue] = React.useState(0);
  const { history, match } = props;
  const { location } = history;
  const { businessId } = localStorage;
  const { patientId } = match.params;
  const handleChange = (event, newValue) => {
    props.history.push(newValue);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={location.pathname}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab icon={<PeopleIcon />} component={Link} label="Patients" to={`/patients/${businessId}`} {...a11yProps(0)} />
        <Tab icon={<AssignmentIcon />} component={Link} label=" Medical Records" to="/medicalRecords" {...a11yProps(1)} />
        <Tab icon={<LocalHospitalIcon />} component={Link} label="Medications" to="/medications" {...a11yProps(2)} />
        <Tab icon={<ReportProblemIcon />} component={Link} label="Diseases" to="/diseases" {...a11yProps(3)} />
        {checkAdmin() ? <Tab icon={<LocalPharmacyIcon />} component={Link} label="Pharmacy" to="/admin/pharmacies" {...a11yProps(4)} /> : ''}
        {checkAdmin() ? <Tab icon={<GroupAddIcon />} component={Link} label="Users" to="/users" {...a11yProps(5)} /> : ''}
        <Tab icon={<GroupAddIcon />} component={Link} label="Employee" to="/employees" {...a11yProps(5)} />
      </Tabs>

      <TabPanel value={location.pathname} index={`/patients/${businessId}`}>
       <AllPatients businessId={businessId} />
      </TabPanel>
       {/* Medical record */}

      <TabPanel value={location.pathname} index={`/patient/${businessId}/${patientId}`}>
      <AddMedicalRecords />
      </TabPanel>
      <TabPanel value={location.pathname} index="/medicalRecords">
      <AllMedicalRecords />
      </TabPanel>

      <TabPanel value={location.pathname} index={`/patient/${businessId}`}>
      <AddPatient />
      </TabPanel>
       {/* Medications */}

      <TabPanel value={location.pathname} index="/medications">
      <AllMedications />
      </TabPanel>
      <TabPanel value={location.pathname} index="/medication">
      <AddMedication />
      </TabPanel>

      {/* Diseases */}

      <TabPanel value={location.pathname} index="/diseases">
      <AllDiseases />
      </TabPanel>
      <TabPanel value={location.pathname} index="/disease">
      <AddDisease />
      </TabPanel>
      {/* pharmacies */}
      <TabPanel value={location.pathname} index="/admin/pharmacies">
      <AllPharmacies />
      </TabPanel>
      <TabPanel value={location.pathname} index="/admin/pharmacy">
      <AddPharmacy />
      </TabPanel>
      <TabPanel value={location.pathname} index="/users">
      <AllUsers />
      </TabPanel>
        {/* users */}
      <TabPanel value={location.pathname} index="/admin/users">
      <AddUser />
      </TabPanel>
       {/* emplyees */}
       <TabPanel value={location.pathname} index="/employees">
       <AllEmployee />
       </TabPanel>
       <TabPanel value={location.pathname} index="/employee">
       <AddEmployee />
       </TabPanel>
    </div>
  );
};

VerticalTabs.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pathname: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  pharmacy: state.pharmacy.singleBusiness,
  pharmacyError: state.pharmacy.singleBusinessError,
  status: state.pharmacy.status,
});

export default compose(withRouter, connect(mapStateToProps, {}))(withStyles(LoaderStyles)(VerticalTabs));
