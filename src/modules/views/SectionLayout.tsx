import { Container, createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";


interface Props extends WithStyles<typeof styles> {
    backgroundClassName?: string,
    children?: React.ReactNode, 
}


const styles = (theme: Theme) => createStyles ({
    root: {
        color: theme.palette.common.white,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '90vh',
        [theme.breakpoints.up('md')]: {
            height: '95vh',
        }
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: -1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    },
});



function SectionLayout(props: Props) {
    const { backgroundClassName, children, classes } = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                {children}
                <div className={classes.backdrop} />
                <div className={clsx(classes.background, backgroundClassName)} />
            </Container>
        </section>
    );
}


export default React.memo(withStyles(styles)(SectionLayout));