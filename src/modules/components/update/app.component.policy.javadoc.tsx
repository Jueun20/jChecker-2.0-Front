import { Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Grid, 
    TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { DialogRawCheckUtilProp } from ".";



export default function JavadocDialog(props: DialogRawCheckUtilProp) {
    const { t } = useTranslation();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(props.initial.state ? props.initial.deductPoint : 0);
    const [resJvd, setResJvd] = useState({
        state: props.initial.state,
        deductPoint : props.initial.deductPoint,
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
        props.onCreate("javadoc", resJvd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resJvd]);



    const handleClose = () => {
        props.onClose("javadoc");
        setOpen(false);
    }

    const handleDelete = () => {
        setResJvd({
            state: false,
            deductPoint : 0,
        });
        props.onSubmit("javadoc", false, 0);
        setOpen(false);
    }


    const handleResJvd = () => {
        setResJvd({
            state: true,
            deductPoint : deduct,
        });
        props.onSubmit("javadoc", true, deduct);
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-jvd"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-pk">
            {t('policy.javadoc.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.javadoc.2')}
            </DialogContentText>

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
                {resJvd.state &&
                    <Button onClick={handleDelete} color="primary">
                        {t('delete')}
                    </Button>
                }
                <Button onClick={handleResJvd} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}