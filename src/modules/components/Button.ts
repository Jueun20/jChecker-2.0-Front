import { Button, Theme, withStyles } from "@material-ui/core";

export default withStyles((theme: Theme) => ({
    root: {
        borderRadius: 30,
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamily,
        padding: theme.spacing(2, 4),
        fontSize: theme.typography.pxToRem(14),
        boxShadow: 'none',
        '&:active, &:focus': {
            boxShadow: 'none',
        },
    },

    sizeSmall: {
        padding: theme.spacing(1, 3),
        fontSize: theme.typography.pxToRem(13),
    },

    sizeLarge: {
        padding: theme.spacing(2, 5),
        fontSize: theme.typography.pxToRem(16),
    },
}))(Button);