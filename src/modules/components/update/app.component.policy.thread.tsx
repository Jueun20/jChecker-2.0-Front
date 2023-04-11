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
import {truncateSync} from "fs";



export default function ThreadDialog(props: DialogRawCheckUtilProp) {
    const { t } = useTranslation();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(props.initial.state ? props.initial.deductPoint : 0);
    const [resThd, setResThd] = useState({
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
        props.onCreate("thread", resThd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resThd]);



    const handleClose = () => {
        props.onClose("thread")
        setOpen(false);
    }

    const handleDelete = () => {
        setResThd({
            state: false,
            deductPoint : 0,
        });
        props.onSubmit("thread", false, 0);
        setOpen(false);
    }


    const handleResThd = () => {
        setResThd({
            state: true,
            deductPoint : deduct,
        });
        props.onSubmit("thread", true, deduct);
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-thd"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-pk">
            {t('policy.thread.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.thread.2')}
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
                {resThd.state &&
                    <Button onClick={handleDelete} color="primary">
                        {t('delete')}
                    </Button>
                }
                <Button onClick={handleResThd} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}