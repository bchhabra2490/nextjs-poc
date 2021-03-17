import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      main: '#4AA35A',
      light: '#00A651',
    },
    secondary: {
      main: '#9E0B0F',
      light: '#ff4081',
    },
    text: {
      primary: '#252525',
    },
  },
});

export default responsiveFontSizes(theme);
