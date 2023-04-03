import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    red: {
      color: "red"
    },
    green: {
      color: "green"
    },
    yellow: {
      color: "yellow"
    }
  })
);
