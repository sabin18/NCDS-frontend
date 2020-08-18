import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import VerticalTabs from './veriticalTab';
import PrimarySearchAppBar from './menu';
import LoaderStyles from '../../styles/loaderStyles';
import { GetOneMyBusiness } from '../../actions/pharmacyActions';

export class Main extends Component {
  state = {
    isLoading: false,
    open: false,
  };

  async componentDidMount() {
    const { props } = this;
    const { business } = props;
    this.setState({ isLoading: true, open: true });
    await props.GetOneMyBusiness(business);
    this.setState({ isLoading: false, open: false });
  }

  render() {
    const { classes } = this.props;
    const { isLoading, open } = this.state;
    return (
 <div>
   {isLoading && (
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={this.handleClose}
        >
       <CircularProgress className={classes.buttonProgress} />
        </Backdrop>
   )}
<PrimarySearchAppBar />
<VerticalTabs />
 </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object,
  GetOneMyBusiness: PropTypes.func,
  business: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  pharmacy: state.pharmacy.singleBusiness,
  pharmacyError: state.pharmacy.singleBusinessError,
  status: state.pharmacy.status,
});

export default compose(withRouter, connect(mapStateToProps, { GetOneMyBusiness }))(withStyles( LoaderStyles)(Main));
