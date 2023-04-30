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
import {DialogRawUtilProp} from ".";
import { useTranslation } from "react-i18next";
import { DeleteOutline } from "@material-ui/icons";


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    }
});


export default function PackageDialog(props: DialogRawUtilProp) {
    const { t } = useTranslation();
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState<string[]>(() => {
        if (props.initial.required !== null) {
            const array = [];
            for (let i = 0; i < props.initial.required.length; i ++) {
                array.push(`pk-${i}`);
            }
            return array;
        }
        return ["pk-0"];
    });
    const [required, setRequired] = useState(props.initial.state ? props.initial.required : [""]);
    const [deduct, setDeduct] = useState(props.initial.state ? props.initial.deductPoint : 0);
    const [max_deduct, setMax_deduct] = useState(props.initial.state ? props.initial.maxDeduct : 0);
    const [resPK, setResPK] = useState({
        state: props.initial.state,
        required: props.initial.required,
        deductPoint : props.initial.deductPoint,
        maxDeduct: props.initial.maxDeduct
    });


    const appendFields = () => {
        let element = `pk-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const deleteFields = (index : number) => {
        const _fields = [...fields];
        const _required = [...required];

        _fields.splice(index, 1);
        _required.splice(index, 1);

        setFields(_fields);
        setRequired(_required);
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
        props.onCreate("packages", resPK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resPK]);


    
    const handleRequiredChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...required];
        newArr[index] = e.target.value;
        setRequired(newArr);
    }
    


    const handleClose = () => {
        props.onClose("packages");
        setOpen(false);
    }

    const handleDelete = () => {
        setResPK({
            state: false,
            required: [],
            deductPoint: 0,
            maxDeduct: 0
        });
        props.onSubmit("packages", false, [], 0, 0);
        setOpen(false);
    }


    const handleResPK = () => {
        setResPK({
            state: true,
            required: required,
            deductPoint : deduct,
            maxDeduct: max_deduct
        });
        props.onSubmit("packages", true, required, deduct, max_deduct)
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-pk"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-pk">
            {t('policy.package.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.package.2')}
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
                <Grid xs={12} container spacing={1} item key={index} alignItems="center" justify="center">
                    <Grid xs={11} item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={required[index] || ""}
                                variant="outlined"
                                id={"pk-" + index}
                                label={t('package path')}
                                name={"pk-" + index}
                                size="medium"
                                className="pk"
                                onChange={handleRequiredChange(index)}
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
                {resPK.state &&
                    <Button onClick={handleDelete} color="primary">
                        {t('delete')}
                    </Button>
                }
                <Button onClick={handleResPK} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}