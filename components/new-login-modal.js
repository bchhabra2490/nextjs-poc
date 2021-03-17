import React from 'react';
import className from 'classnames';
import {
  Typography,
  Button,
  SvgIcon,
  CircularProgress,
} from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Notification from './alert-notification';
import defaultTheme from '../theme-material-ui/theme';
import {
  googleAuthProvider,
  appleAuthProvider,
  getIdToken,
} from '../services/auth';

const GoogleIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 46 46">
    <defs>
      <filter
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        filterUnits="objectBoundingBox"
        id="filter-1"
      >
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation="0.5"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0"
          in="shadowBlurOuter1"
          type="matrix"
          result="shadowMatrixOuter1"
        />
        <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter2" />
        <feGaussianBlur
          stdDeviation="0.5"
          in="shadowOffsetOuter2"
          result="shadowBlurOuter2"
        />
        <feColorMatrix
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0"
          in="shadowBlurOuter2"
          type="matrix"
          result="shadowMatrixOuter2"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="shadowMatrixOuter2" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <rect id="path-2" x="0" y="0" width="40" height="40" rx="2" />
      <rect id="path-3" x="5" y="5" width="38" height="38" rx="1" />
    </defs>
    <g
      id="Google-Button"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      sketchType="MSPage"
    >
      <g
        id="9-PATCH"
        sketchType="MSArtboardGroup"
        transform="translate(-608.000000, -219.000000)"
      />
      <g
        id="btn_google_dark_normal"
        sketchType="MSArtboardGroup"
        transform="translate(-1.000000, -1.000000)"
      >
        <g
          id="button"
          sketchType="MSLayerGroup"
          transform="translate(4.000000, 4.000000)"
          filter="url(#filter-1)"
        >
          <g id="button-bg">
            <use
              fill="#4285F4"
              fillRule="evenodd"
              sketchType="MSShapeGroup"
              xlinkHref="#path-2"
            />
            <use fill="none" xlinkHref="#path-2" />
            <use fill="none" xlinkHref="#path-2" />
            <use fill="none" xlinkHref="#path-2" />
          </g>
        </g>
        <g id="button-bg-copy">
          <use
            fill="#FFFFFF"
            fillRule="evenodd"
            sketchType="MSShapeGroup"
            xlinkHref="#path-3"
          />
          <use fill="none" xlinkHref="#path-3" />
          <use fill="none" xlinkHref="#path-3" />
          <use fill="none" xlinkHref="#path-3" />
        </g>
        <g
          id="logo_googleg_48dp"
          sketchType="MSLayerGroup"
          transform="translate(15.000000, 15.000000)"
        >
          <path
            d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z"
            id="Shape"
            fill="#4285F4"
            sketchType="MSShapeGroup"
          />
          <path
            d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z"
            id="Shape"
            fill="#34A853"
            sketchType="MSShapeGroup"
          />
          <path
            d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z"
            id="Shape"
            fill="#FBBC05"
            sketchType="MSShapeGroup"
          />
          <path
            d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z"
            id="Shape"
            fill="#EA4335"
            sketchType="MSShapeGroup"
          />
          <path
            d="M0,0 L18,0 L18,18 L0,18 L0,0 Z"
            id="Shape"
            sketchType="MSShapeGroup"
          />
        </g>
        <g id="handles_square" sketchType="MSLayerGroup" />
      </g>
    </g>
  </SvgIcon>
);

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Open Sans',
    fontSize: 30,
    lineHeight: '50px',
    marginBottom: theme.spacing(6),
  },
  registerText: {
    color: '#666666',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    lineHeight: '22px',
    textAlign: 'center',
  },
  linkContainer: {
    textAlign: 'center',
    padding: theme.spacing(0, 12),
    marginBottom: theme.spacing(5),
  },
  contentContainer: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
  },
  phoneButton: {
    color: '#fff',
    boxShadow: 'none',
    backgroundColor: '#0C552F',
    padding: theme.spacing(1.5, 5),
    textTransform: 'capitalize',
    fontWeight: 600,
    fontSize: 16,
    '&:hover,&:active': {
      boxShadow: 'none',
      backgroundColor: '#0C552F',
    },
  },
  authGoogleButton: {
    backgroundColor: '#4284f5',
    color: '#fff',
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 30,
    textTransform: 'inherit',
    '&:hover,&:focus,&:active': {
      backgroundColor: '#4284f5',
      color: '#fff',
    },
  },
  authAppleButton: {
    backgroundColor: '#050708',
    color: '#fff',
    textTransform: 'inherit',
    padding: '12px 50px',
    '&:hover,&:focus,&:active': {
      backgroundColor: '#050708',
      color: '#fff',
    },
  },
  labelText: {
    paddingBottom: 20,
  },
  startIcon: {
    marginLeft: 0,
    '& > *:first-child': {
      fontSize: 50,
    },
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  buttonContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -12,
  },
}));

const NewLoginModal = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const handleNotificationClose = () => {
    setNotification(false);
  };
  const handleClick = (provider) => {
    setLoading(true);
    if (provider === 'google') {
      googleAuthProvider()
        .then(() => {
          getIdToken().then((token) => {
            setLoading(false);
            if(typeof window != 'undefined'){

              window.localStorage.setItem('token', token);
            }
            handleClose();
          });
        })
        .catch((error) => {
          setNotification(true);
          setLoading(false);
          setNotificationMessage(error.message);
        });
    } else if (provider === 'apple') {
      appleAuthProvider()
        .then(() => {
          getIdToken().then((token) => {
            setLoading(false);
            if(typeof window != 'undefined'){
              window.localStorage.setItem('token', token);
            }
            handleClose();
          });
        })
        .catch((error) => {
          setLoading(false);
          setNotification(true);
          setNotificationMessage(error.message);
        });
    }
  };

  return (
    <div className={className('modal login-modal', { 'is-active': isOpen })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <h1 className="modal-title">
            <span>Teji</span>
            {' '}
            <span>Mandi</span>
          </h1>
        </header>
        <section className="modal-card-body">
          <ThemeProvider theme={defaultTheme}>
            <Typography component="h6" align="center" className={classes.title}>
              Sign Up to Invest
            </Typography>
            <div className={classes.contentContainer}>
              {/* <Button variant="contained" className={classes.phoneButton}>
                Sign Up with Phone
              </Button> */}
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  classes={{
                    startIcon: classes.startIcon,
                  }}
                  disabled={loading}
                  onClick={() => handleClick('google')}
                  startIcon={<GoogleIcon />}
                  className={classes.authGoogleButton}
                >
                  Sign Up with Google
                </Button>
                {loading && (
                  <CircularProgress
                    width={20}
                    height={20}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  classes={{
                    startIcon: classes.startIcon,
                  }}
                  disabled={loading}
                  className={classes.authAppleButton}
                  onClick={() => handleClick('apple')}
                >
                  Sign Up with Apple
                </Button>
                {loading && (
                  <CircularProgress
                    width={20}
                    height={20}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
            <Typography component="div" className={classes.linkContainer}>
              By signing up you accept our
              {' '}
              <Typography component="span" className={classes.link}>
                privacy policy
              </Typography>
              {' '}
              and
              {' '}
              <Typography component="span" className={classes.link}>
                terms and conditions
              </Typography>
            </Typography>
            <Typography className={classes.registerText}>
              We are a SEBI registered investment advisor0x11277281
            </Typography>
            <Notification
              notification={notification}
              message={notificationMessage}
              severity="error"
              handleClose={handleNotificationClose}
            />
          </ThemeProvider>
        </section>
      </div>
    </div>
  );
};

NewLoginModal.propTypes = {};

export default NewLoginModal;
