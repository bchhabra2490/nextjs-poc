import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '15%',
    height: '3rem',
    margin: '0 3px',
    fontSize: '2rem',
    border: 'none',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    outline: 'none',
    borderRadius: 0,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '35%',
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  timerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textButton: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 400,
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  time: {
    color: theme.palette.primary.main,
  },
  resendButton: {
    textTransform: 'capitalize',
    minWidth: 'auto',
    fontSize: 16,
    fontWeight: 400,
  }
}));
