import {
    createStyles,
    lighten,
    makeStyles,
    Theme,
  } from "@material-ui/core/styles";
  import { navRight } from "aws-amplify";
  
  
  export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      table: {
        // minWidth: 750,
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      addButton: {
        width: '100%',
        margin: 'right',
      },
      button: {
        width: '20%',
        margin: 'right',
      },
      container: {
        maxHeight: 200,

      },
    })
  );