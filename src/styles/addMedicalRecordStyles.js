import { makeStyles } from '@material-ui/core/styles';

const addMedicalStyles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(4),
      width: '23ch',
    },
    addPatientContiner: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'inline',
    },
  },

});

export default addMedicalStyles;
