import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect ,useState} from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const {   openModal, setOpenModal, mensaje, title, fields, onSubmit,onSubmitEdit ,defaultData,clearDefaultData} = props
    const [data,setData] = useState(null)
    useEffect(  () => {
        if(defaultData!=null){
            setData(defaultData)
        }
    }, [defaultData])
    const handleClose = () => {
        setOpenModal(false);
        setData(null)
        clearDefaultData()
    };
    return (
        <div>
            <Dialog
                open={openModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" sx={{ mb: 2 }}>
                        {mensaje}
                    </DialogContentText>
                    <Grid container spacing={2} >
                        {
                            fields.map((field,index) => (
                                <Grid item xs={12}>
                                    {
                                        field.type === 'select' && (
                                            <FormControl fullWidth key={index}>
                                                <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={data!=null?data[field.name]:''}
                                                    onChange={(e) => {
                                                        setData({ ...data, [field.name]: e.target.value })
                                                    }
                                                    }
                                                    defaultValue=""
                                                    label={field.label}

                                                >
                                                      <MenuItem value={""}>Selecciona una opción</MenuItem>
                                                    {
                                                        field.data.map((item) => (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        )
                                    }
                                    {
                                        field.type === 'text' && (
                                            <TextField
                                                key={index}
                                                variant="outlined"
                                                label={field.label}
                                                value={data!=null?data[field.name]:''}
                                                onChange={(e) => {
                                                    setData({ ...data, [field.name]: e.target.value })
                                                }
                                                }
                                                sx={field?.style}
                                                name={field.name}
                                            />
                                        )
                                    }
                                </Grid>

                            ))
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={()=>{
                        if(defaultData!=null){
                            onSubmitEdit(data)
                        }else{
                            onSubmit(data)
                        }
                        handleClose()
                    }}>Continuar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
