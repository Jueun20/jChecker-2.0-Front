import { Container, createStyles, Grid, Theme, withStyles, WithStyles } from "@material-ui/core";
import Typographic from "../components/Typographic";
import React from "react";
import { useTranslation } from "react-i18next";


interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: theme.palette.secondary.light,
        height: '90vh',
        [theme.breakpoints.up('md')]: {
            height: '125vh',
        }
    },
    container: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(30),
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
    },
    number: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium, 
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 60,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(14),
    },
    hologram: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
    },
});


function SectionDetail(props: Props) {
    const { classes } = props;
    const { t } = useTranslation();

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="assets/hologram.png"
                    className={classes.hologram}
                    alt="back hologram"
                />
                <Typographic variant="h4" marked="center" className={classes.title} component="h2">
                    How the service works
                </Typographic>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>1.</div>
                                <img
                                    src="assets/upload.png"
                                    alt="file_add"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    {t('detail.1.1')} <br /> {t('detail.1.2')}
                                </Typographic>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>2.</div>
                                <img
                                    src="assets/process.png"
                                    alt="execute"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    {t('detail.2.1')} <br /> {t('detail.2.2')}
                                </Typographic>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3.</div>
                                <img
                                    src="assets/report.png"
                                    alt="file_add"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    {t('detail.3.1')} <br /> {t('detail.3.2')}
                                </Typographic>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3-1.</div>
                                <img
                                    src="assets/oop.png"
                                    alt="file_add"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    {t('detail.4.1')} <br /> {t('detail.4.2')} <br /> {t('detail.4.3')}
                                </Typographic>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3-2.</div>
                                <img
                                    src="assets/debugging.png"
                                    alt="file_add"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    {t('detail.5.1')} <br /> {t('detail.5.2')}
                                </Typographic>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.item}>
                                <div className={classes.number}>3-3.</div>
                                <img
                                    src="assets/software.png"
                                    alt="file_add"
                                    className={classes.image}
                                />
                                <Typographic variant="h5" align="center">
                                    {t('detail.6.1')} <br /> {t('detail.6.2')} <br /> {t('detail.6.3')}
                                </Typographic>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    )
}



export default React.memo(withStyles(styles)(SectionDetail));