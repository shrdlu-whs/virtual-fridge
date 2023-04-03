import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    registerWrapper: {
      display: "flex",
      height: "100vh",
      // background: `linear-gradient(rgba(16, 16, 16, 0.8), rgba(16, 16, 16, 0.8)), url(${TowerImage})`,
    },
  })
);
