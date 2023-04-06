import {AppBar, Button, Grid, Link, makeStyles, Theme} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import WithRoot from '../../root';
import SectionLayout from "../../views/SectionLayout";
import Typographic from "../Typographic";
import Toolbar from '../Toolbar';
import AppFooter from "../../views/Footer";
import axios from "axios";
import { ClassroomInstProps, RouteParamsProps } from ".";
import SectionTable from "./SectionTable";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";



const backgroundImages = "https://images.unsplash.com/photo-1605142806579-f51ce5ecfb73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";


const backgroundImage = backgroundImages;


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
    title: {
        fontSize: 42,
        letterSpacing: 7,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    logo: {
        marginTop: theme.spacing(1),
        maxWidth: 200,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 250,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 300,
        },
    },
    table: {
        width: '100%',
    },
    save: {
        maxHeight: 18,
        borderRadius: 30,
    },
}));


const useStylesLayout = makeStyles((theme: Theme) => ({
    root: {
        height: '120vh',
        // minHeight: 500,
        // maxHeight: 800,
        [theme.breakpoints.up('sm')]: {
            height: '150vh',
            // minHeight: 800,
            // maxHeight: 1300,
        },
    },
}));


function ClassForInst (props: RouteComponentProps<RouteParamsProps>) {
    const classesStyle = useStyles();
    const classesLayout = useStylesLayout();

    const initial = {
        itoken: "",
        token: "",
        className: "",
        instructor: "",
        createDate: "",
        feedbackLevel: 1,
    };

    const initial_feedbackLevel = 1;
    const [level, setLevel] = useState(initial_feedbackLevel);
    const [classroom, setClassroom] = useState(initial);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (classroom === initial) {
            const currentClassroomState = async (): Promise<ClassroomInstProps[]> => {
                // return await axios.get<ClassroomInstProps[]>('http://isel.lifove.net/api/token2.0/')
                return await axios.get<ClassroomInstProps[]>('/api/token2.0/')
                .then((response) => {
                    return response.data
                });
            };


            currentClassroomState()
            .then(response => {
                setClassroom(response.find(element => element.itoken === props.match.params.token) || initial);
                setLevel(response.find(element => element.itoken === props.match.params.token)?.feedbackLevel || initial_feedbackLevel);
                if (response.find(element => element.itoken === props.match.params.token) === undefined) {
                    props.history.push('/jchecker2.0');
                    alert("클래스가 없습니다.😅");
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[classroom]);

    const level_state = {
        selectList: [1, 2, 3],
        selectValue: classroom.feedbackLevel,
    };

    const handleSave = async () => {
        const updatedFields = {
            feedbackLevel: level,
        };

        // axios.post ("http://isel.lifove.net/api/token2.0/update", updatedFields, {
        await axios.post("/api/token2.0/update", updatedFields, {
            params: {
                token: classroom.token
            },
            headers: {'Content-Type': 'application/json'}
        });

        alert("저장되었습니다.🙂");
    }

    return (
        <>
            <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }} >
                <Toolbar className={classesStyle.toolbar}> 
                    <Link
                        variant="h3"
                        underline="none"
                        color="inherit"
                        className={classesStyle.title}
                        href="/jchecker2.0"
                    >
                        <img src="/assets/logo.png" alt="logo" className={classesStyle.logo} />
                    </Link>
                </Toolbar>
            </AppBar>
            <SectionLayout backgroundClassName={classesStyle.background} classes={classesLayout}>
                <img style={{ display : 'none' }} src={backgroundImage} alt="prioirty" />
                <Typographic color="inherit" align="center" variant="h2" marked="center" className={classesStyle.h2}>
                    {classroom.className}
                </Typographic>
                
                <SectionTable itoken={classroom.itoken} />

                <Typographic color="inherit" align="center" variant="h5" className={classesStyle.h5}>
                    opened by <b>{classroom.instructor}</b> on {classroom.createDate}
                </Typographic>

                <Grid container direction="row" justify="center">
                    <Typography style={{color: 'white', fontSize: '15px', fontWeight: 'bold'}}>Level of feedback &nbsp;&nbsp;&nbsp;</Typography>
                    <Grid item>
                        {level_state.selectList.map((value, i) => (
                            <React.Fragment key={i}>
                                <input
                                    id={value.toString()}
                                    value={value}
                                    name="feedbackLevel"
                                    type="radio"
                                    checked={level === value}
                                    onChange={e => setLevel( parseInt(e.target.value) || level)}
                                />
                                {value}&nbsp;&nbsp;
                            </React.Fragment>
                        ))}
                    </Grid>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={handleSave}
                            className={classesStyle.save}
                        >
                            SAVE
                        </Button>
                    </Grid>
                </Grid>

            </SectionLayout>
            <AppFooter />
        </>
    
    );
}


export default React.memo(WithRoot(ClassForInst));