import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
  fade,
} from "@material-ui/core/styles";
import {
  amber,
  green,
  grey,
  red,
} from '@material-ui/core/colors';

const defaultTheme = createMuiTheme({ palette: { type: "dark" } });

export const statusColors = {
  success: green[800],
  warning: amber[900],
  info: grey[900],
  error: red[900],
};

const primary = {
  light: "#e91e63",
  main: "#a31545",
  dark: "#720e30",
};

export const secondary = {
  light: "#696969",
  main: "#282828",
  dark: "#000",
};

export const primaryLighter = "#ff2e75";
export const primaryDarker = "#4a091f";
export const primaryGradient = `linear-gradient(90deg, ${primary.dark} 0%, ${primary.main} 35%, ${primaryDarker} 100%)`;

export const background = {
  default: '#191919',
  paper: '#202020',
  darker: '#101010',
};

export default function virtualFridgeTheme() {
  return createMuiTheme({
    // palette: {
    //   primary: primary,
    //   secondary: secondary,
    //   background: {
    //     default: "#191919",
    //     paper: "#232323",
    //   },
    //   type: "dark",
    // },
  });
}
