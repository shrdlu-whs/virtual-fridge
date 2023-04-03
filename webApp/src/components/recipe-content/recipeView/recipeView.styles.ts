import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  recipeContentContainer: {
    padding: theme.spacing(5, 5),
  },
  
  recipeTitle: {
    marginTop: 0,
    textAlign: "center",
    marginBottom: theme.spacing(3),
    textTransform: "uppercase",
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}));
