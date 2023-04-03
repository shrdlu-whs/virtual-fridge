import { makeStyles, Theme } from '@material-ui/core';
// import { resizeHandleContainerHeight, toolbarHeight } from '../header/headerContainer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    top: theme.spacing(2),
    width: 350
  },
  authorized: {
    top:
      theme.spacing(2)
  },
}));

export default useStyles;
