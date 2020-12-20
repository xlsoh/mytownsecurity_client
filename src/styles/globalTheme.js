import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#eeeeee',
      main: '#32e0c4',
      dark: '#0d7377',
      contrastText: '#fff',
    },
  },
});

const GlobalThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default GlobalThemeProvider;
