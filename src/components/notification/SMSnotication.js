import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import moment from 'moment';
import { SendSMS } from '../../actions/noticationActions';

const now = moment().format('h:mm');
if (now === moment().format('h:mm')) {
  setTimeout(console.log('===>', now), 50);
}
// componentDidMount() {
//   this.timer = setInterval(()=> console.log(now), 1000)
//   }
export class sendSMSnotification extends Component {
   state = {
     isLoading: false,
   };

   componentDidMount() {
     this.timer = setInterval(() => console.log(now), 1000);
   }

   //  async componentDidMount() {
   //    const { props } = this;
   //    setInterval(console.log(now), 5000);
   //    await props.SendSMS();
   //    console.log('notification send====>', moment().format('h:mm'));
   //  }

   render() {
     document.title = 'NCDS -notification';
     location.reload();

     return (
        <div />
     );
   }
}

sendSMSnotification.propTypes = {
  SendSMS: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  sendSMS: state.notification.sendSMS,
  sendSMSError: state.notification.sendSMSError,
  status: state.notification.status,
});

export default compose(withRouter, connect(mapStateToProps, { SendSMS }))((sendSMSnotification));
