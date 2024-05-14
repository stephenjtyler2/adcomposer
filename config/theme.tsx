import { createTheme } from '@mui/material/styles';
import { red,amber,green, blue } from '@mui/material/colors';

const white = '#fff';
const motionPointBlue = '#0150c9';
const motionPointBlueLight = '#668bc4'
// Create a theme instance.
const theme = createTheme({
  palette: {
    // see .... https://mui.com/material-ui/customization/palette/

    mode:'light',
    // background colors (app bar, buttons)
    background: {
      paper: '#ffffff',
    },
    primary: {
      main: motionPointBlue,  
    },
    secondary: {
      main: motionPointBlueLight,
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
      main: motionPointBlue,    // Motionpoint Blue - use for accented backgrounds e.g. avatars, appbars, buttons
      borders: '#aaa',       // light grey for use as a soft outline / border color
      searchBar: '#e7e7e7',
      contrastText: white,
      appBackground: '#fbfdff',
      mainPanelBackground: white,
    },


  }
});
export default theme;