import {Container, Grid, Link, makeStyles, Theme, Typography} from "@material-ui/core";
import Typographic from '../components/Typographic';
import React from "react";


function Copyright() {
    return (
        <React.Fragment>
            {'ⓒ '}
            <Link color="inherit" href="https://isel.handong.edu/">
                <b>ISEL</b> Lab in Handong Global University.
            </Link>{' '}
            {new Date().getFullYear()}<br/>
        </React.Fragment>
    );
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
        display: 'flex',
    },
    logoWrapper: {
        height: 76,
        marginBottom: theme.spacing(1),
        alignItems: 'center',
    },
    icons: {
        width: 30,
        height: 30,
        [theme.breakpoints.up('sm')]: {
            width: 40,
            hidth: 40,
        },
        [theme.breakpoints.up('xl')]: {
            width: 55,
            hidth: 55,
        },
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(3),
    },
    logoIcons: {
        maxWidth: 180,
        maxHeight: 30,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 250,
            maxHeight: 40,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 300,
            maxHeight: 50,
        },
        display: 'flex',
        marginRight: theme.spacing(1),
    },
    labIcons: {
        width: 36,
        hidth: 34,
        [theme.breakpoints.up('sm')]: {
            width: 50,
            height: 52,
        },
        [theme.breakpoints.up('xl')]: {
            width: 81,
            height: 84,
        },
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    backgroundIcons: {
        width: 120,
        height: 46,
        [theme.breakpoints.up('sm')]: {
            width: 160,
            height: 61,
        },
        [theme.breakpoints.up('xl')]: {
            width: 200,
            height: 71,
        },
        display: 'flex',
        justifyContent: 'center',
    },
    white: {
        color: theme.palette.common.white,
    }
}));


function AppFooter() {
    const classes = useStyles();

    return (
        <Typography component="footer" className={classes.root}>
            <Container className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Grid
                            container
                            direction='row'
                            justify="flex-start"
                            className={classes.logoWrapper}
                        >
                            <img src="/assets/logo.png" alt="logo" className={classes.logoIcons}/>
                        </Grid>

                        <Grid item>
                            <Copyright/>

                            <Typographic variant="caption" gutterBottom>
                                {'Icons made by '}
                                <Link href="https://www.freepik.com" rel="sponsered" title="Freepik"
                                      className={classes.white}>
                                    <b>Freepik</b>
                                </Link>
                                {' from '}
                                <Link href="https://www.flaticon.com" rel="sponsered" title="Flaticon"
                                      className={classes.white}>
                                    www.flaticon.com
                                </Link>
                                {' is licensed by '}
                                <Link href="https://creativecommons.org/licenses/by/3.0" title="Creative Commons BY 3.0"
                                      target="_blank" rel="noopener noreferrer" className={classes.white}>
                                    CC 3.0 BY
                                </Link>
                            </Typographic>

                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                            >
                                <Grid item>
                                    <a href="https://github.com/Jueun20">
                                        <img src="/assets/github.svg" alt="Github" className={classes.icons}/>
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="https://github.com/nayeawon">
                                        <img src="/assets/github.svg" alt="Github" className={classes.icons}/>
                                    </a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            className={classes.logoWrapper}
                        >
                            <Grid item>
                                <img src="/assets/hand.png" alt="Handong" className={classes.backgroundIcons}/>
                            </Grid>
                            <Grid item>
                                <img src="/assets/ISEL-t.png" alt="ISEL" className={classes.labIcons}/>
                            </Grid>
                        </Grid>
                        <Typographic variant="caption" gutterBottom>
                            Handong Global University 558 Handong-ro <br/>Buk-gu, Pohang Gyeongbuk 37554 Republic of
                            Korea
                        </Typographic>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    )
}


export default React.memo(AppFooter);