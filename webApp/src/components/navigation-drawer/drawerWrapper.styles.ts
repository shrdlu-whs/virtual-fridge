import { makeStyles, Theme } from "@material-ui/core/styles";
import { drawerWidth } from "./drawerWrapper"

export const useStyles = makeStyles((theme: Theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: +drawerWidth,
      },
}));
