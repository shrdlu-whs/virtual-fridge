import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    productItemButton: {
      marginTop: "16px",
      marginBottom: "8px",
    },
  })
);
