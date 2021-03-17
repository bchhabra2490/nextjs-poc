import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  contentContainer: {
    minHeight: 600,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    '&:first-child': {
      paddingTop: 8,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '8px 15px',
    },
  },
  titleContainer: {
    padding: '0 5rem',
    flex: 0.4,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    '& > p': {
      lineHeight: 1.2,
      fontSize: 20,
    },
    [theme.breakpoints.down('xs')]: {
      flex: 0,
      padding: 3,
    },
  },
  title: {
    fontSize: 22,
    lineHeight: '30px',
    textAlign: 'center',
    color: '#252525',
    fontFamily: 'Open Sans',
    fontWeight: 300,
    marginBottom: '2rem',
  },
  paragraph: {
    fontFamily: 'Open Sans',
    fontWeight: 300,
    fontSize: 15,
    lineHeight: '22px',
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 0.5,
    [theme.breakpoints.down('xs')]: {
      flex: 0.8,
    },
  },
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '40px 0px',
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
