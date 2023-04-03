import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  addRecipeContentContainer: {
    padding: theme.spacing(5, 5),
  },
  
  addRecipeTitle: {
    marginTop: 0,
    textAlign: "center",
    marginBottom: theme.spacing(3),
    textTransform: "uppercase",
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}));
