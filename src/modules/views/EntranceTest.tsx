import { IconButton, makeStyles, TextField, Theme } from "@material-ui/core";
import StarterMajorLayout from "./SectionLayout";
import Typographic from "../components/Typographic";
import { Link, RouteComponentProps } from "react-router-dom";
import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import AppbarView from './Appbar';
import WithRoot from '../root';
import AppFooter from "./Footer";
import { useTranslation } from "react-i18next";


const backgroundImage = 'https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80';


const useStyles = makeStyles((theme: Theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#5d5447',
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 125,
    },
    h2: {
        fontFamily: 'ELAND_Choice_M',
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
        fontFamily: 'JSDongkang-Regular',
    },
    more: {
        marginTop: theme.spacing(2),
    },
    textField: {
        margin: 8,
        borderColor: "white",
        borderRadius: 4,
        backgroundColor: "white",
        width: 250,
        [theme.breakpoints.up('sm')]: {
            width: 350,
        },
        [theme.breakpoints.up('lg')]: {
            width: 500,
        },
    },
    resize: {
        fontSize: theme.typography.pxToRem(14),
        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(16),
        },
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(20),
        },
    },
}));



function EntranceClass (props: RouteComponentProps) {
    const classes = useStyles();
    const [value, setValue] = useState("");

    const { t } = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }


    return (
        <>
            <AppbarView />
            <StarterMajorLayout backgroundClassName={classes.background}>
                {}
                <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
                <Typographic color="inherit" align="center" variant="h2" marked="center" className={classes.h2}>
                    {t('entrance.test title')}
                </Typographic>
                <Typographic color="inherit" align="center" variant="h5" className={classes.h5}>
                    {t('entrance.test detail')}
                </Typographic>
                <TextField
                    autoFocus={true}
                    value={value || ""}
                    onChange={handleChange}
                    onKeyPress={e => {
                        if (e.key === 'Enter' && value.length > 0)
                            props.history.push(`${props.match.url}/${value}`)
                    }}
                    label={t('input.')}
                    className={classes.textField}
                    placeholder={t('input.token')} margin="normal" variant="outlined" InputProps={{
                    classes: {
                        input: classes.resize,
                    },
                    endAdornment: (
                        <Link to={`${props.match.url}/${value}`}>
                            <IconButton aria-label="token inputs" edge="end">
                                <SearchIcon />
                            </IconButton>
                        </Link>
                    )
                }} />
            </StarterMajorLayout>
            <AppFooter />
        </>
    );
}


export default React.memo(WithRoot(EntranceClass));