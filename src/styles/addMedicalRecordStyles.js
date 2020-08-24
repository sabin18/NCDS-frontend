import { makeStyles } from '@material-ui/core/styles';

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
    paddingBottom: '15px',
    justifyContent: 'center',
  },

});

export default addMedicalStyles;
