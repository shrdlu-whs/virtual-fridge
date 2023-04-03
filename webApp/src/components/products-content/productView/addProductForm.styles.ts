import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ingredientButton: {
      marginTop: "16px",
      marginBottom: "8px",
    },

    addProductContentContainer: {
      padding: theme.spacing(5, 5),
    },

    addProductTitle: {
      marginTop: 0,
      textAlign: "center",
      marginBottom: theme.spacing(3),
      textTransform: "uppercase",
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },

    categorylist:{
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },

    icon_expand: {
      float: 'right',
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },

    icon_expandOpen: {
      float: 'right',
      transform: 'rotate(180deg)',
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
