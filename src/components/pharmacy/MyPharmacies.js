import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import PaymentIcon from '@material-ui/icons/Payment';
import Divider from '@material-ui/core/Divider';
import Copyright from '../copyright';
import LoaderStyles from '../../styles/loaderStyles';
import pharmaStyles from '../../styles/pharmacyStyles';
import color from '../../helpers/randomColors';
import { GetAllMyBusiness } from '../../actions/pharmacyActions';

export class AllMypharmacy extends Component {
   state = {
     isLoading: false,
   };

   async componentDidMount() {
     const { props } = this;
     this.setState({ isLoading: true});
     await props.GetAllMyBusiness();
     this.setState({ isLoading: false });
   }

   render() {
     const { classes, pharmacy } = this.props;
     const { isLoading } = this.state;
     const Mypharmacy = pharmacy && pharmacy.data;
     document.title = 'NCDS -My Pharmacy';
     return (
        <div className={classes.pharmacyContainer}>
          <Grid
            container
            justify="center"
            className={classes.alignItems}
            direction="column"
            alignItems="center"
          >
           <div className={classes.title}><h2>Select Pharmacy</h2></div>
          <List className={classes.root}>
          { isLoading

            ? (
            <div>
            <CircularProgress className={classes.buttonProgress} />
            {' '}
            <h3>Please wait......</h3>
            </div>
            )
            : Mypharmacy && Mypharmacy.map((item) => (
             <Link style={{ textDecoration: 'none', color: 'black' }} to={`/`}>
            <List key={item.id}>
                <Divider />
                <ListItem
                  component="span"
                  button
                >
                  <ListItemAvatar>
                    <Avatar
                      style={{
                        backgroundColor: color(),
                      }}
                    >
                      {item.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.payments ? item.payments.expiryDate : 'No payment yet'} />
                  <ListItemSecondaryAction spacing={2}>
                              <IconButton edge="end" aria-label="pay">
                                <PaymentIcon />
                              </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </List>
            </Link>
            ))}
          </List>
          </Grid>
          <Box>
          <Copyright />
          </Box>
        </div>
     );
   }
}

AllMypharmacy.propTypes = {
  classes: PropTypes.object,
  GetAllMyBusiness: PropTypes.func,
  pharmacy: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  pharmacy: state.pharmacy.business,
  pharmacyError: state.pharmacy.businessError,
  status: state.pharmacy.status,
});

export default compose(withRouter, connect(mapStateToProps, { GetAllMyBusiness }))(withStyles(pharmaStyles, LoaderStyles)(AllMypharmacy));
