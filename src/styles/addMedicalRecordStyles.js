const addMedicalStyles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '23ch',
    },
  },

  addPatientContiner: {
    display: 'flex !important',
    margin: theme.spacing(1),
  },

  Recordform: {
    borderRadius: '25px',
    border: '1px solid #E6E6E6',
    padding: '20px',
    backgroundColor: '#FDFDFD',
  },
  formTitle: {
    justifyContent: 'center',
    paddingLeft: '22rem',
  },

  diver: {
    marginBottom: '15px',
  },

});

export default addMedicalStyles;
