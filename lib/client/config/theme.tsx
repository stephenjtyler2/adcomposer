import { createTheme } from '@mui/material/styles';
import { red,amber,green, blue } from '@mui/material/colors';


// Create a theme instance.
const theme = createTheme({
  palette: {
    // see .... https://mui.com/material-ui/customization/palette/

    mode:'light',
    // background colors (app bar, buttons)
    background: {
      paper: '#fdfdfd',
    },
    primary: {
      main: '#0150c9',  // motionpoint blue
    },
    secondary: {
      main: '#0150c9',
    },
    info: {
      main: blue.A400,
    },
    success: {
      main: green.A400,
    },
    warning: {
      main: amber.A400,
    },
    error: {
      main: red.A400,
    },

    motionPoint: {
      main: '#0150c9',    // Motionpoint Blue - use for accented backgrounds e.g. avatars, appbars, buttons
      borders: '#e7e7e7',       // light grey for use as a soft outline / border color
      searchBar: '#e7e7e7',
      contrastText: '#fff',
    },


  }
});
export default theme;