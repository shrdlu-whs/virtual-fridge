import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { background } from '../../assets/themes/virtual-fridge-theme';
const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    'html, body': {
      height: '100%',
      backgroundColor: background.darker,
      overflow: 'hidden',
    },
    '#root': {
      height: '100%',
      background: background.darker,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    '.container': {
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.full-width': {
      width: '100%',
    },
    '.form-title': {
      textAlign: 'center',
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '1rem',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        backgroundColor: theme.palette.background.paper,
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#616161',
        outline: '1px solid slategrey',
      },
    }
  },
}));

const GlobalStyles = () => {
  useStyles();
  return null;
};

export default GlobalStyles;
