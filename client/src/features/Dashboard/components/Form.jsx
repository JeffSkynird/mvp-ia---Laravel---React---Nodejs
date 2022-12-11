import { Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { crearUsuarios, editarUsuarios } from '../../../services/api/users/users';
import { useAuth } from '../../../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';

export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange', defaultValues: state
    });
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const entrar = async (dt) => {
        mostrarLoader(true)
        let data;
        if (state) {
            data = await editarUsuarios(dt)
        } else {
            data = await crearUsuarios(dt)
        }
        mostrarLoader(false)
        mostrarNotificacion(data)
        if (data.status == 200) {
            window.location.href = "/usuarios"
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
            href="/usuarios"
        >
            Usuarios
        </Link>,
        <Typography key="3" color="text.primary">
            {state ? "Editar" : "Crear"}
        </Typography>,
    ];
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
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        name="password"
                        {...register("password", {
                            required: state ? false : "Required",
                        })}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                entrar()
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }

                        label="Contraseña"
                    />
                </FormControl>
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
