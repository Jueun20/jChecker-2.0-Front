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
import {DialogRawOracleProp} from ".";
import { DeleteOutline, SubdirectoryArrowRight } from "@material-ui/icons";


const style = makeStyles({
    buttonRight: {
        float: 'right',
        position: 'relative',
    },
});



export default function OracleDialog(props: DialogRawOracleProp) {
    const { t } = useTranslation();
    const classes = style();
    const { open: isOpen } = props;
    
    const [open, setOpen] = useState(isOpen);
    const [fields, setFields] = useState<string[]>(() => {
        if (props.initial.input !== null) {
            const array = [];
            for (let i = 0; i < props.initial.input.length; i ++) {
                array.push(`io-${i}`);
            }
            return array;
        }
        return ["io-0"];
    });
    const [outputData, setOutputData] = useState(props.initial.state ? props.initial.output : [""]);
    const [inputData, setInputData] = useState(props.initial.state ? props.initial.input : [""]);
    const [filePathData, setfilePathData] = useState(props.initial.state ? props.initial.filePath : [""]);
    const [checksumData, setChecksumData] = useState(props.initial.state ? props.initial.checksum : [""]);
    const [deduct, setDeduct] = useState(props.initial.state ? props.initial.deductPoint : 0);
    const [max_deduct, setMax_deduct] = useState(props.initial.state ? props.initial.maxDeduct : 0);
    const [resOracle, setResOracle] = useState({
        state: props.initial.state,
        input: props.initial.input,
        output: props.initial.output,
        filePath: props.initial.filePath,
        checksum: props.initial.checksum,
        deductPoint : props.initial.deductPoint,
        maxDeduct: props.initial.maxDeduct
    });


    const appendFields = () => {
        let element = `io-${fields.length}`;
        setFields(fields => fields.concat([element]));
    }


    const deleteFields = (index : number) => {
        const _fields = [...fields];
        const _input = [...inputData];
        const _output = [...outputData];
        const _filePath = [...filePathData];
        const _checksum = [...checksumData];

        _fields.splice(index, 1);
        _input.splice(index, 1);
        _output.splice(index, 1);
        _filePath.splice(index, 1);
        _checksum.splice(index, 1);

        setFields(_fields);
        setInputData(_input);
        setOutputData(_output);
        setfilePathData(_fields);
        setChecksumData(_checksum);
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


    const handleFilePathChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...filePathData];
        newArr[index] = e.target.value;
        setfilePathData(newArr);
    }


    const handleChecksumChange = (index : number) => (e : React.ChangeEvent<HTMLInputElement>) => {
        let newArr = [...checksumData];
        newArr[index] = e.target.value;
        setChecksumData(newArr);
    }


    const handleClose = () => {
        props.onClose("oracle")
        setOpen(false);
    }


    const handleDelete = () => {
        setResOracle({
            state: false,
            input: [],
            output: [],
            filePath: [],
            checksum: [],
            deductPoint : 0,
            maxDeduct: 0
        });
        props.onSubmit("oracle", false, [], [], [], [], 0, 0);
        setOpen(false);
    }


    const handleResOracle = () => {
        setResOracle({
            state: true,
            input: inputData,
            output: outputData,
            filePath: filePathData,
            checksum: checksumData,
            deductPoint : deduct,
            maxDeduct: max_deduct
        })
        props.onSubmit("oracle", true, inputData, outputData, checksumData, filePathData, deduct, max_deduct);
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
                <Grid container spacing={1} alignItems="center" justify="center">
                    <Tooltip title="파일 다루지 않으면 빈 칸으로">
                        <IconButton>
                            <SubdirectoryArrowRight />
                        </IconButton>
                    </Tooltip>
                    <Grid xs item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                value={filePathData[index] || ""}
                                variant="outlined"
                                id={"crc_fp-" + index}
                                label={t('policy.io.filePath')}
                                name={"crc_fp-" + index}
                                className="crc_fp"
                                multiline
                                onChange={handleFilePathChange(index)}
                            />
                        </FormControl>
                    </Grid>
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
                {resOracle.state &&
                    <Button onClick={handleDelete} color="primary">
                        {t('delete')}
                    </Button>
                }
                <Button onClick={handleResOracle} color="primary">
                    {t('submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}