import { makeStyles } from '@material-ui/core';
import { statusColors } from '../../assets/themes/virtual-fridge-theme';

const useStyles = makeStyles(theme => ({
  error: {
    background: statusColors.error
  },
  warning: {
    background: statusColors.warning
  },
  info: {
    background: statusColors.info
  },
  success: {
    background: statusColors.success
  },
  default: {
    background: theme.palette.background.default
  }
}));

export default useStyles;
