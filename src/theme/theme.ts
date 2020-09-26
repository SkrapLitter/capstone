import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d7f4cb',
      main: '#83e85a',
      dark: '#055425',
      contrastText: '#000',
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
