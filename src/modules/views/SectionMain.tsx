import { Theme, withStyles, WithStyles, Grid } from "@material-ui/core";
import SectionLayout from "./SectionLayout";
import Typographic from "../components/Typographic";
import Button from "../components/Button";
import React from "react";
import FadeIn from "react-fade-in";
import { useTranslation } from "react-i18next";
import SectionBegin from "./SectionBegin";


//const backgroundImage = 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
//const backgroundImage = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
const backgroundImage = 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80';

interface Props extends WithStyles<typeof styles> {}


const styles = (theme: Theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#5d5447',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 125,
        margin: theme.spacing(1),
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
    textField: {
        background: 'white',
    }
});


function SectionMain(props: Props) {
    const { classes } = props;
    const { t } = useTranslation();
    const height = window.innerHeight;

    const handleMiddle = () => {
        //window.scrollTo({top: 1400, left: 0, behavior: 'smooth'});
        window.scrollTo({top: height * 1.0, left: 0, behavior: 'smooth'});
    }

    const handleBottom = () => {
        window.scrollTo({top: height * 2.2, left: 0, behavior: 'smooth'});
    }

    return (
        
        <SectionLayout backgroundClassName={classes.background}>
            {}
            <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
            <FadeIn delay={200}>
                <Typographic color="inherit" align="center" variant="h2" marked="center">
                    JUDGE YOUR ASSIGNMENTS
                </Typographic>
                <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                    We provide OOP-based Java program scoring service through static analysis.
                </Typographic>
            </FadeIn>
            <Button
                color="secondary"
                variant="contained"
                size="medium"
                className={classes.button}
                onClick={handleMiddle}
            >
                {t('about_button')}
            </Button>
            <Button
                color="secondary"
                variant="contained"
                size="medium"
                className={classes.button}
                onClick={handleBottom}
            >
                {t('start_button')}
            </Button>
            <Typographic variant="body2" color="inherit" className={classes.more}>
                with ISEL, HGU.
            </Typographic>
        </SectionLayout>
        
    );
}


export default React.memo(withStyles(styles)(SectionMain));
