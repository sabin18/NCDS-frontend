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
import Autocomplete from '@material-ui/lab/Autocomplete';
import LoaderStyles from '../../styles/loaderStyles';
import addPatientStyles from '../../styles/addPatientStyles';
import { AddNewUser } from '../../actions/usersAction';
import { GetAllRoles } from '../../actions/rolesActions';
import FormLoader from '../main components/formLoader';

import Loader from '../main components/loader';

export class AddUser extends Component {
   state = {
     open: false,
     firstName: '',
     lastName: '',
     phoneNumber: '',
     email: '',
     password: '',
     role: '',
     isLoading: false,

   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true });
     await props.GetAllRoles();
     this.setState({ isLoading: false });
   }

   handleChange = (e) => {
     e.preventDefault();
     const { name, value } = e.target;
     this.setState({
       [name]: value,
     });
   };

     handleSubmit = async (e) => {
       e.preventDefault();
       const host = window.location.origin;
       const { firstName, lastName, phoneNumber, email, password, role } = this.state;
       this.setState({ open: true });
       const { AddNewUser } = this.props;
       const userData = {
         firstName,
         lastName,
         phoneNumber,
         email,
         password,
         role,
         host,
       };
       await AddNewUser(userData);
       this.setState({
         open: false, firstName: '', lastName: '', phoneNumber: '', email: '', password: '', role: '',
       });
     };

     render() {
       const {
         classes, roles,
       } = this.props;
       const { firstName, lastName, phoneNumber, email, password, role, isLoading, open } = this.state;
       const rolesData = roles && roles.data;
       const rolesList = rolesData && rolesData.map((item) => item.name);
       document.title = 'NCDS - Add User';
       return (
       <div>
        <Grid item xs={12}>
        {isLoading ? <FormLoader /> : rolesData
         && (
        <Paper className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="on" onSubmit={this.handleSubmit}>
              <Typography variant="h5" gutterBottom className={classes.formTitle}>
                ADD NEW USER
              </Typography>
              <Divider className={classes.diver} />
              <Typography variant="button" gutterBottom className={classes.addPatientContiner}>
                <b>USER DETAILS</b>
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
                  value={phoneNumber}
                  onChange={(e) => this.handleChange(e)}
                  label="Phone Number"
                  name="phoneNumber"
                />
                <TextField
                  id="standard-basic"
                  value={email}
                  onChange={(e) => this.handleChange(e)}
                  label="Email"
                  name="email"
                />
                <div className={classes.addUserContiner}>
                <TextField
                  type="password"
                  id="standard-basic"
                  value={password}
                  onChange={(e) => this.handleChange(e)}
                  label="Password"
                  name="password"
                />
                <Autocomplete
                  id="standard-basic"
                  autoHighlight
                  value={role}
                  options={rolesList && rolesList}
                  onSelect={(e) => this.handleChange(e)}
                  renderInput={(params) => <TextField {...params} name="role" label="Select role" />}
              />
                </div>
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
         )}
        </Grid>
       </div>
       );
     }
}

AddUser.propTypes = {
  AddNewUser: PropTypes.func,
  GetAllRoles: PropTypes.func,
  classes: PropTypes.object,
  businessId: PropTypes.string,
  match: PropTypes.object,
  roles: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  addUser: state.user.AddUser,
  addUserError: state.user.AddUserError,
  roles: state.role.roles,


});

export default compose(withRouter, connect(mapStateToProps, { AddNewUser, GetAllRoles }))(withStyles(addPatientStyles, LoaderStyles)( AddUser));
