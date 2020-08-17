const pharmaStyles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    border: '0.1',
    borderColor: '#F1F1F1',
    borderStyle: 'solid',
    borderRadius: '15px',
  },

  alignItems: {
    paddingTop: '70px',
    backgroundColor: '#F9FBF5',
  },

  pharmacyContainer: {
    backgroundColor: '#F9FBF5',
    height: '100vh',
  },
  AvatarColor: {
    backgroundColor: '#ED4926',
  },

  title: {
    paddingBottom: '8px',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default pharmaStyles;
