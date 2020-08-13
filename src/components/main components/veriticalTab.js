/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VerticalTabStyles from '../../styles/veriticalTab';
import NotFound from '../NotFound';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

export default function VerticalTabs() {
  const classes = VerticalTabStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Patients" {...a11yProps(0)} />
        <Tab label=" Medical Records" {...a11yProps(1)} />
        <Tab label="Medications" {...a11yProps(2)} />
        <Tab label="Diseases" {...a11yProps(3)} />
        <Tab label="Pharmacy" {...a11yProps(4)} />
        <Tab label="Users" {...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Patients
      </TabPanel>
      <TabPanel value={value} index={1}>
       Medical Records
      </TabPanel>
      <TabPanel value={value} index={2}>
       <NotFound />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Diseases
      </TabPanel>
      <TabPanel value={value} index={4}>
        Pharmacy
      </TabPanel>
      <TabPanel value={value} index={5}>
        Users
      </TabPanel>
    </div>
  );
}
