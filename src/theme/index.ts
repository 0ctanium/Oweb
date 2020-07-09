import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#2c3e50',
    },
    text: {
      primary: '#ecf0f1',
      secondary: '#8e44ad',
    },
    primary: {
      main: '#2980b9',
    },
    secondary: {
      main: '#27ae60',
    },
    success: {
      main: '#2ecc71',
    },
    error: {
      main: '#c0392b',
    },
    warning: {
      main: '#e67e22',
    },
  },
});

export default theme;
