import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
  palette: {
    mode:'light',
    // background colors (app bar, buttons)
    background: {
      paper: '#fdfdfd',
    },
    primary: {
      main: '#0150c9',
    },
    text: {
      primary: '#101010',
      secondary: '#333333',
    },
    error: {
      main: red.A400,
    },
  }
});
export default theme;