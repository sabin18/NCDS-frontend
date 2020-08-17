import { blue } from '@material-ui/core/colors';

const LoaderStyles = (theme) => ({
  buttonProgress: {
    color: blue[1000],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    height: '100vh',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

export default LoaderStyles;
