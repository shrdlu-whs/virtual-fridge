import { createStyles, lighten, makeStyles, Theme, fade } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
    title: {
      flex: "1 1 100%",
    },
    fabContainer: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
);
