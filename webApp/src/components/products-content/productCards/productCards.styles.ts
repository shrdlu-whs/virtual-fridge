import {
    createStyles,
    makeStyles,
    Theme,
    useTheme
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: "100%"
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
        paper: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
        cardRoot: {
            maxWidth: "100%",
        },
        media: {
            height: 140,
        },
        nutritionScore: {
            float: "left"
        },
        totalQuantity: {
            float: "right"
        },
        quantityActions:{
            float: "right",
            alignItems: "right"
        }
    }),
);

