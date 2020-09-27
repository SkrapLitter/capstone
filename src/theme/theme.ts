import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00ff6a',
      main: '#04e762',
      dark: '#2d3142',
      contrastText: '#fff',
    },
    secondary: {
      light: '#cce7ff',
      main: '#369bf4',
      dark: '0a1d2e',
      contrastText: '#000',
    },
    warning: {
      light: '#cce7ff',
      main: '#F5587B',
      dark: '0a1d2e',
      contrastText: '#000',
    },
  },
});

export default theme;
