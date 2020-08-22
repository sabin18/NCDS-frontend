/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter, Link } from 'react-router-dom';
import TabPanel from './tabPanel';
import LoaderStyles from '../../styles/loaderStyles';
import VerticalTabStyles from '../../styles/veriticalTab';
import AllPatients from '../patients/viewPatients';
import AddMedicalRecords from '../Medical Records/AddMedicalRecord';

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
        <Tab component={Link} label="Patients" to={`/patient/${businessId}`} {...a11yProps(0)} />
        <Tab component={Link} label=" Medical Records" to="/medications" {...a11yProps(1)} />
        <Tab component={Link} label="Medications" to="/medications" {...a11yProps(2)} />
        <Tab component={Link} label="Diseases" to="/diseases" {...a11yProps(3)} />
        <Tab component={Link} label="Pharmacy" to="/admin/pharmacy" {...a11yProps(4)} />
        <Tab component={Link} label="Users" to="/users" {...a11yProps(5)} />
      </Tabs>

      <TabPanel value={location.pathname} index={`/patient/${businessId}`}>
       <AllPatients businessId={businessId} />
      </TabPanel>
      <TabPanel value={location.pathname} index={`/patient/${businessId}/${patientId}`}>
      <AddMedicalRecords />
      </TabPanel>
      <TabPanel value={location.pathname} index="/medications">
      Medications
      </TabPanel>
      <TabPanel value={location.pathname} index="/diseases">
        Diseases
      </TabPanel>
      <TabPanel value={location.pathname} index="/admin/pharmacy">
        Pharmacy
      </TabPanel>
      <TabPanel value={location.pathname} index="/users">
        Users
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
