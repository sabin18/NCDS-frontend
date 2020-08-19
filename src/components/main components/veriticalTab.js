/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withRouter, Link } from 'react-router-dom';
import LoaderStyles from '../../styles/loaderStyles';
import VerticalTabStyles from '../../styles/veriticalTab';
import EnhancedTable from '../patients/viewPatients';
function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs(props) {
  const classes = VerticalTabStyles();
  const [value, setValue] = React.useState(0);
  const { history } = props;
  const { location } = history;
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
        <Tab component={Link} label="Patients" to="/patient" {...a11yProps(0)} />
        <Tab component={Link} label=" Medical Records" to="/medicals" {...a11yProps(1)} />
        <Tab component={Link} label="Medications" to="/medications" {...a11yProps(2)} />
        <Tab component={Link} label="Diseases" to="/diseases" {...a11yProps(3)} />
        <Tab component={Link} label="Pharmacy" to="/admin/pharmacy" {...a11yProps(4)} />
        <Tab component={Link} label="Users" to="/users" {...a11yProps(5)} />
      </Tabs>

      <TabPanel value={location.pathname} index="/patient">
       <EnhancedTable />
      </TabPanel>
      <TabPanel value={location.pathname} index="/medicals">
       Medical Records
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
}

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
