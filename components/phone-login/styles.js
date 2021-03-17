import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    textAlign: 'right',
    padding: 0,
  },
  contentTitle: {
    fontSize: 22,
    lineHeight: '30px',
    textAlign: 'center',
    color: '#252525',
    fontFamily: 'Open Sans',
    fontWeight: 300,
  },
  content: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  formContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    borderRadius: 2,
  },
}));
