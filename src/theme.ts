import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      dark: "rgb(0, 65, 75)",
      light: "#427783"
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background:{
      default: "rgb(0 0 0 / 13%)",
    },
  },
});

export default theme;
