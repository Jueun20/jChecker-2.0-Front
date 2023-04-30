import { Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormControl, 
    Grid, 
    IconButton, 
    makeStyles, 
    TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from "react-i18next";
import {DialogRawInterfaceOrSuperClassProp} from ".";
import { DeleteOutline } from "@material-ui/icons";


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export default function InterfaceDialog(props: DialogRawInterfaceOrSuperClassProp) {
    const { t } = useTranslation();
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState<string[]>(() => {
        if (props.initial.inherit !== null) {
            const array = [];
            for (let i = 0; i < props.initial.inherit.length; i ++) {
                array.push(`itf-${i}`);
            }
            return array;
        }
        return ["itf-0"];
    });
    const [originClass, setOrigins] = useState(props.initial.state ? props.initial.origins : [""]);
    const [interfaces, setInterfaces] = useState(props.initial.state ? props.initial.inherit : [""]);
    const [deduct, setDeduct] = useState(props.initial.state ? props.initial.deductPoint : 0);
    const [max_deduct, setMax_deduct] = useState(props.initial.state ? props.initial.maxDeduct : 0);
    const [resItf, setResItf] = useState({
        state: props.initial.state,
        origins: props.initial.origins,
        inherit: props.initial.inherit,
        deductPoint: props.initial.deductPoint,
        maxDeduct: props.initial.maxDeduct
    });


    const appendFields = () => {
        let element = `itf-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const deleteFields = (index : number) => {
        const _fields = [...fields];
        const _origin = [...originClass];
        const _interface = [...interfaces];

        _fields.splice(index, 1);
        _origin.splice(index, 1);
        _interface.splice(index, 1);

        setFields(_fields);
        setOrigins(_origin);
        setInterfaces(_interface);
    }


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen) {
            handleOpen();
        }

    },[isOpen]);


    useEffect(() => {
        props.onCreate("inheritInterface", resItf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resItf]);


    const handleOriginChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...originClass];
        newArr[index] = e.target.value;
        setOrigins(newArr);
    }


    const handleInterfaceChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...interfaces];
        newArr[index] = e.target.value;
        setInterfaces(newArr);
    }



    const handleClose = () => {
        props.onClose("interfaces")
        setOpen(false);
    }

    const handleDelete = () => {
        setResItf({
            state: false,
            origins: [],
            inherit: [],
            deductPoint : 0,
            maxDeduct: 0
        });
        props.onSubmit("inheritInterface", "interfaces", false, [], [], 0, 0);
        setOpen(false);
    }
    

    const handleResItf = () => {
        setResItf({
            state: true,
            origins: originClass,
            inherit: interfaces,
            deductPoint : deduct,
            maxDeduct: max_deduct
        });
        props.onSubmit("inheritInterface", "interfaces", true, originClass, interfaces, deduct, max_deduct);
        setOpen(false);
    }



    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-itf"
                maxWidth="md"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-itf">
            {t('policy.interface.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.interface.2')}
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>
                    {t('add')}
                </Button>
            </DialogContentText>

            <Grid container spacing={2}>
                <Grid item>   
                    <TextField
                        type="number"
                        defaultValue={deduct}
                        label={t('policy.basic.deduct')}
                        size="small"
                        margin="dense"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="number"
                        defaultValue={max_deduct}
                        label={t('policy.basic.max')}
                        size="small"
                        margin="dense"
                        onChange={e => setMax_deduct(parseFloat(e.target.value) || max_deduct)}
                    />
                </Grid>
            </Grid>

            {fields.map((input, index) => (
                <Grid container spacing={1} key={index} alignItems="center" justify="center">
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={originClass[index] || ""}
                                variant="outlined"
                                id={"org-" + index}
                                label={t('Interface class name')}
                                name={"org-" + index}
                                size="medium"
                                className="iorg"
                                onChange={handleOriginChange(index)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={interfaces[index] || ""}
                                variant="outlined"
                                id={"itf-" + index}
                                label={t('interface name')}
                                name={"itf-" + index}
                                size="medium"
                                className="itf"
                                onChange={handleInterfaceChange(index)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={1} item>
                        <IconButton size="medium" onClick={() => deleteFields(index)}>
                            <DeleteOutline />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                {resItf.state &&
                    <Button onClick={handleDelete} color="primary">
                        {t('delete')}
                    </Button>
                }
                <Button onClick={handleResItf} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}