import React from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = (classes, open, handleClose) => {
  return (

       <CircularProgress className={classes.buttonProgress} />

  );
};

export default Loader;
