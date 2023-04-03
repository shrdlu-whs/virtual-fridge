import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: theme.spacing(2),
    },
    cardRoot: {
      maxWidth: 280,
      minWidth: 280,
      height: "100%"
    },
    media: {
      height: 140,
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
