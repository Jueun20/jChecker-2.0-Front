import { Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Divider, 
    FormControl, 
    Grid, 
    IconButton, 
    makeStyles, 
    TextField, 
    Tooltip} from "@material-ui/core";
import React, { useEffect, useState } from "react"
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from "react-i18next";
import { DialogRawProp } from ".";
import { DeleteOutline, SubdirectoryArrowRight } from "@material-ui/icons";


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    },
});



export default function OracleDialog(props: DialogRawProp) {
    const { t } = useTranslation();
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState(["io-0"]);
    const [outputData, setOutputData] = useState([""]);
    const [inputData, setInputData] = useState([""]);
    const [checksumData, setChecksumData] = useState([""]);
    const [deduct, setDeduct] = useState(0);
    const [max_deduct, setMax_deduct] = useState(0);
    const [resOracle, setResOracle] = useState({
        state: false,
        input: [] as string[],
        output: [] as string[],
        checksum: [] as string[],
        deductPoint : 0,
        maxDeduct: 0
    });


    const appendFields = () => {
        let element = `io-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const deleteFields = (index : number) => {
        const _fields = [...fields];
        const _input = [...inputData];
        const _output = [...outputData];

        _fields.splice(index, 1);
        _input.splice(index, 1);
        _output.splice(index, 1);

        setFields(_fields);
        setInputData(_input);
        setOutputData(_output);
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
        props.onCreate("oracle", resOracle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[resOracle]);

    
    const handleInputChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...inputData];
        newArr[index] = e.target.value;
        setInputData(newArr);
    }
    

    const handleOutputChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...outputData];
        newArr[index] = e.target.value;
        setOutputData(newArr);
    }


    const handleChecksumChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...checksumData];
        newArr[index] = e.target.value;
        setChecksumData(newArr);
    }


    const handleClose = () => {
        setResOracle({
            state: false,
            input: [],
            output: [],
            checksum: [],
            deductPoint : 0,
            maxDeduct: 0
        })
        setOpen(false);
    }


    const handleResOracle = () => {
        setResOracle({
            state: true,
            input: inputData,
            output: outputData,
            checksum: checksumData,
            deductPoint : deduct,
            maxDeduct: max_deduct
        })
        setOpen(false);
    }


    return (
        <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-io"
                maxWidth="md"
                fullWidth={true}
                scroll='paper'
                disableEscapeKeyDown
        >
        <DialogTitle id="form-dialog-io">
            {t('policy.io.1')}
        </DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {t('policy.io.2')}
                <Button variant="outlined" onClick={() => appendFields()} startIcon={<AddIcon />} className={classes.buttonRight}>
                    {t('add')}
                </Button>
            </DialogContentText>

            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                        type="number"
                        value={deduct}
                        label={t('policy.basic.deduct')}
                        size="small"
                        margin="dense"
                        onChange={e => setDeduct(parseFloat(e.target.value) || deduct)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="number"
                        value={max_deduct}
                        label={t('policy.basic.max')}
                        size="small"
                        margin="dense"
                        onChange={e => setMax_deduct(parseFloat(e.target.value) || max_deduct)}
                    />
                </Grid>
            </Grid>

            {fields.map((input, index) => (
                <>
                <Grid container spacing={1} key={index} alignItems="center" justify="center">
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={inputData[index] || ""}
                                variant="outlined"
                                id={"in-" + index}
                                label={t('policy.io.input')}
                                name={"in-" + index}
                                className="io"
                                multiline
                                onChange={handleInputChange(index)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={outputData[index] || ""}
                                variant="outlined"
                                id={"out-" + index}
                                label={t('policy.io.output')}
                                name={"out-" + index}
                                className="oi"
                                multiline
                                onChange={handleOutputChange(index)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={1} item>
                        <IconButton size="medium" onClick={() => deleteFields(index)}>
                            <DeleteOutline />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="center">
                    <Tooltip title="파일 다루지 않으면 빈 칸으로">
                        <IconButton>
                            <SubdirectoryArrowRight />
                        </IconButton>
                    </Tooltip>
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={checksumData[index] || ""}
                                variant="outlined"
                                id={"crc-" + index}
                                label={t('policy.io.checksum')}
                                name={"crc-" + index}
                                className="crc"
                                multiline
                                onChange={handleChecksumChange(index)}
                            />
                        </FormControl>
                    </Grid>
                    <Divider />
                </Grid>
                </>
            ))}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('closed')}
                </Button>
                <Button onClick={handleResOracle} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}