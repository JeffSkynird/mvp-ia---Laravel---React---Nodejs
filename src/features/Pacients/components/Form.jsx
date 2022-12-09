import { Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { crearUsuarios, editarUsuarios } from '../../../services/api/users/users';
import { useAuth } from '../../../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import { crear, editar } from '../../../services/api/pacients/pacients';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';
export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [borndate,setBorndate] = useState(new Date())
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange', defaultValues: state
    });
    useEffect(()=>{
        if(state!=null){
            let parts =state.born_date.split('-');
            if(parts!=null&&parts.length!=0){
                let mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                setBorndate(mydate)
            }
          
        }
    },[state])
    const validacion = (dt)=>{
        let errors =false;
        if(!validar(dt.dni)){
            mostrarNotificacion({ type: "error",message: 'Cédula no válida' })
            errors = true;
        }
        if(!validateEmail(dt.email)){
            mostrarNotificacion({ type: "error",message: 'Correo no válido' })
            errors = true;
        }
        return errors;
    }
    
    function validar(cad) {
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;

        if (cad !== "" && longitud === 10){
          for(let i = 0; i < longcheck; i++){
            if (i%2 === 0) {
              var aux = cad.charAt(i) * 2;
              if (aux > 9) aux -= 9;
              total += aux;
            } else {
              total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
          }

          total = total % 10 ? 10 - total % 10 : 0;

          if (cad.charAt(longitud-1) == total) {
            return true;
          }else{
           return false;
          }
        }
      }

    const entrar = async (dt) => {
        console.log(dt)
        dt.born_date = borndate
        if(validacion(dt)){
            return
        }
       mostrarLoader(true)
        let data;
        if (state) {
            data = await editar(dt, usuario.token)
        } else {
            data = await crear(dt, usuario.token)
        }
        mostrarLoader(false)
        mostrarNotificacion(data)
        if (data.status == 200) {
            window.location.href = "/pacientes"
        } 
    }
    const breadcrumbs = [
        <Link underline="none" key="1" color="inherit"  >
            SISTEMA
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/pacientes"
        >
            Pacientes
        </Link>,
        <Typography key="3" color="text.primary">
            {state ? "Editar" : "Crear"}
        </Typography>,
    ];
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    return (
        <Grid container spacing={2} >
            <Grid item xs={12}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Cédula"
                    type="number"
                    error={Boolean(errors.dni)}
                    {...register("dni", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="dni"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Nombres"
                    error={Boolean(errors.names)}
                    {...register("names", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="names"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Apellidos"
                    error={Boolean(errors.last_names)}
                    {...register("last_names", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="last_names"
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Correo electrónico"
                    error={Boolean(errors.email)}
                    {...register("email", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="email"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Dirección"
                    error={Boolean(errors.address)}
                    {...register("address", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="address"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Celular"
                    error={Boolean(errors.phone)}
                    {...register("phone", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="phone"
                />
            </Grid>
            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}   >
                    <DatePicker
                        label="Fecha de nacimiento  "
                        value={borndate}
                        onChange={(newValue) => {
                            setBorndate(newValue);
                        }}
                        name="born_date"
                        disableFuture
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField       style={{width: '100%'}}  {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <Button
                    onClick={handleSubmit(entrar)}
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Guardar
                </Button>

            </Grid>
        </Grid>
    )
}
