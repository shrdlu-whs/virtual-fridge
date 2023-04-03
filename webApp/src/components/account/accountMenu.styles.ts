import {
    createStyles,
    lighten,
    makeStyles,
    Theme,
  } from "@material-ui/core/styles";
  
  export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      inlineLink: {
        color: theme.palette.primary.light,
        verticalAlign: 'baseline',
      },
    })
  );
  