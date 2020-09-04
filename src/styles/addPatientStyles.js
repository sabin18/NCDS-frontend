const addPatientStyles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '23ch',
    },
  },

  addPatientContiner: {
    paddingLeft: '12px',
  },

  addPatientButton: {
    paddingLeft: '12px',
    paddingBottom: '12px',
  },

  Recordform: {
    borderRadius: '25px',
    border: '1px solid #E6E6E6',
    padding: '20px',
    backgroundColor: '#FDFDFD',
  },
  formTitle: {
    textAlign: 'center',
  },

  diver: {
    marginBottom: '15px',
  },

});

export default addPatientStyles;
