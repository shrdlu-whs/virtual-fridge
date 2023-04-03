import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

import { drawerWidth } from "../navigation-drawer/drawerWrapper"


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    // toolbar: {
    //   minHeight: toolbarHeight,
    //   maxHeight: toolbarHeight,
    //   '-webkit-app-region': 'drag',
    //   paddingBottom: resizeHandleContainerHeight,
    // },

  })
);
