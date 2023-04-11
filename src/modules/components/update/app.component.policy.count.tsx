import { Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Grid, 
    TextField } from "@material-ui/core";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import {DialogCountProp, DialogRawCountProp, DialogRawProp} from ".";

export default function CountDialog(props: DialogRawCountProp) {
    const { t } = useTranslation();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [deduct, setDeduct] = useState(props.initial.state ? props.initial.deductPoint : 0);
    const [methods, setMethods] = useState(props.initial.state ? props.initial.methodCount : 0);
    const [fields, setFields] = useState(props.initial.state ? props.initial.fieldCount : 0);
    const [enhancedFor, setEnhancedFor] = useState(props.initial.state ? props.initial.enForCount : 0);

    const [resCnt, setResCnt] = useState<DialogCountProp>(
        {
            state: props.initial.state,
            methodCount: props.initial.methodCount,
            fieldCount: props.initial.fieldCount,
            enForCount: props.initial.enForCount,
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
        props.onCreate("count", resCnt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resCnt]);


    const handleClose = () => {
        /*
        setResCnt({
            state: false,
            methodCount: 0,
            fieldCount: 0,
            enForCount: 0,
            deductPoint : 0,
        });
        */
        props.onClose("count");
        setOpen(false);
    }


    const handleDelete = () => {
        setResCnt({
            state: false,
            methodCount: 0,
            fieldCount: 0,
            enForCount: 0,
            deductPoint : 0,
        });
        props.onSubmit("count", false, 0, 0, 0, 0);
        setOpen(false);
    }


    const handleResCnt = () => {
        setResCnt({
            state: true,
            methodCount: methods,
            fieldCount: fields,
            enForCount: enhancedFor,
            deductPoint : deduct,
        });
        props.onSubmit("count", true, methods, fields, enhancedFor, deduct);
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-cnt"
                maxWidth="sm"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-cnt">
            {t('policy.count.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.count.2')}
            </DialogContentText>

            <Grid 
                container 
                spacing={2}
                direction='column' >
                <Grid item>
                    <TextField
                        type="number"
                        defaultValue={deduct}
                        label={t('policy.basic.deduct.boolean')}
                        size="small"
                        margin="normal"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="number"
                        defaultValue={methods}
                        label={t('policy.count.methods')}
                        size="small"
                        margin="normal"
                        onChange={e => setMethods(parseInt(e.target.value) || methods)}
                    />

                    <TextField
                        type="number"
                        defaultValue={fields}
                        label={t('policy.count.fields')}
                        size="small"
                        margin="normal"
                        onChange={e => setFields(parseInt(e.target.value) || fields)}
                    />

                    <TextField
                        type="number"
                        defaultValue={enhancedFor}
                        label={t('policy.count.enhance')}
                        size="small"
                        margin="normal"
                        onChange={e => setEnhancedFor(parseInt(e.target.value) || enhancedFor)}
                    />
                </Grid>
            </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                {resCnt.state &&
                    <Button onClick={handleDelete} color="primary">
                        {t('delete')}
                    </Button>
                }
                <Button onClick={handleResCnt} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}