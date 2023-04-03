import {
    createStyles,
    lighten,
    makeStyles,
    Theme,
  } from "@material-ui/core/styles";
  
  
  export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
    })
  );
  