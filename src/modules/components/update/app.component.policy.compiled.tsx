import { Button, 
    Checkbox, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormControlLabel, 
    Grid, 
    TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import {DialogRawCompileProp} from ".";



export default function CompiledDialog(props: DialogRawCompileProp) {
    const { t } = useTranslation();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(props.initial.state ? props.initial.deductPoint : 0);
    const [gradle, setGradle] = useState(props.initial.state ? props.initial.buildTool : false);
    const [resCom, setResCom] = useState({
        state: props.initial.state,
        deductPoint : props.initial.deductPoint,
        buildTool: props.initial.buildTool,
    });


    const handleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (isOpen) {
            handleOpen();
        }
    },[isOpen]);


    useEffect(() => {
        props.onCreate("compiled", resCom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resCom]);


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setGradle(e.target.checked);
    }


    const handleClose = () => {
        props.onClose("compiled")
        setOpen(false);
    }

    const handleDelete = () => {
        setResCom({
            state: false,
            deductPoint : 0,
            buildTool: false,
        });
        props.onSubmit("compiled", false, 0, false);
        setOpen(false);
    }

    const handleResCom = () => {
        setResCom({
            state: true,
            deductPoint : deduct,
            buildTool: gradle,
        });
        props.onSubmit("compiled", true, gradle, deduct);
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-com"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-pk">{t('policy.compiled.1')}</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.compiled.2')}
            </DialogContentText>
            <FormControlLabel
                control={
                    <Checkbox checked={gradle}
                            onChange={handleChange}
                            name="count" />}
                label={t('policy.compiled.build')}
            />
            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                        type="number"
                        defaultValue={deduct}
                        label={t('policy.basic.deduct.boolean')}
                        size="small"
                        margin="dense"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
            </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                {resCom.state &&
                    <Button onClick={handleDelete} color="primary">
                        {t('delete')}
                    </Button>
                }
                <Button onClick={handleResCom} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}