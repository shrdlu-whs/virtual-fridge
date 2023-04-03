import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ingredientButton: {
      marginTop: "16px",
      marginBottom: "8px",
    },
  })
);
