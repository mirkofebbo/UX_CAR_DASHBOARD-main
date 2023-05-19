import { createTheme } from '@mui/material/styles';
import UBMPlexMonoTtf from './fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf';
/*
Import your own fonts tutorials: 
https://mui.com/material-ui/customization/typography/


*/
const theme = createTheme({
  palette: {
    primary: {
      main: '#1f2b46',
    },
    secondary: {
      main: '#c4302b', 
    },
    background: {
      default: '#262626',
    },
    text: {
      primary: '#e1e1e1', 
    },
  },
  typography:{
    fontSize: 18,
    fontFamily: "'IBMPlexMono', monospace",
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "1.25rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'IBMPlexMono';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('IBMPlexMono), local('IBMPlexMono-Regular'), url(${UBMPlexMonoTtf}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
  // Add other custom theme properties here
});

export default theme;
