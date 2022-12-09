import { Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { EditOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { crearUsuarios, editarUsuarios } from '../../../services/api/users/users';
import { useAuth } from '../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import Table from '../../../components/table/Table';
import SimpleModal from '../../../components/modal/SimpleModal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { obtener } from '../../../services/api/value_types/value_types';
import { useQuery } from 'react-query';
import { crear, editar, obtenerPorId } from '../../../services/api/categories/categories';
import { useEffect } from 'react';

export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [datos, setDatos] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState(null)
    const { isLoading, isError, data, error, refetch } = useQuery(['getValueTypes', usuario.token], obtener)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange', defaultValues: state
    });

    useEffect(() => {
        async function fetchData() {
            const data = await obtenerPorId(state.id, usuario.token)
            console.log(data.data.exams)
            setDatos(data.data.exams)
        }
        fetchData()
    }
        , [state])

    const columns = [
        {
            Header: 'Nombre',
            accessor: 'name',
        },
        {
            Header: 'Rango',
            accessor: 'description',
        },
        {
            Header: 'Unidad',
            accessor: 'unity',
        },
        {
            Header: 'Tipo de valor',
            accessor: 'value_type_name',
            Cell: (value) => value.row.original.hasOwnProperty('value_type_name') ? value.row.original.value_type_name: value.row.original.value_type.name,


        },
        {
            Header: 'Acciones',
            accessor: 'action',
            Cell: (value) => (
                <div style={{ display: 'flex' }}>
                    <IconButton aria-label="delete" onClick={() => {
                        setOpenModal(true)
                        setSelected(value.row.original)
                    }}>
                        <EditOutlined />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => eliminarExamen(value.row.original.id)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                </div>

            )
        },
    ]
    const breadcrumbs = [
        <Link underline="none" key="1" color="inherit"  >
            SISTEMA
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/examenes"
        >
            Exámenes
        </Link>,
        <Typography key="3" color="text.primary">
            {state ? "Editar" : "Crear"}
        </Typography>,
    ];
    const eliminarExamen = (id) => {
       
            const newDatos = datos.filter(item => item.id !== id)
            setDatos(newDatos)
      
    }
    const agregar = () => {
        setOpenModal(true)
    }
    const campos = [
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            style: { width: '100%' },
        },
        {
            name: 'description',
            label: 'Rango',
            type: 'text',
            style: { width: '100%' },
        },
        {
            name: 'unity',
            label: 'Unidad',
            type: 'text',
            style: { width: '100%' },
        },
        {
            name: 'value_type_id',
            label: 'Tipos de valores',
            type: 'select',
            data: data != null ? data.data : [],
            style: { width: '100%' },
        },

    ];
    const buscar = (dt) => {
        let item = data.data.find(item => item.id == dt)
        return item.name;
    }
    const entrar = async (dt) => {
        mostrarLoader(true)
        dt.exams = datos
        dt.description="Ninguna";

        console.log(dt)
        let data;
        if (state) {
            data = await editar(dt, usuario.token)
        } else {
            data = await crear(dt, usuario.token)
        }
        mostrarLoader(false)
        mostrarNotificacion(data)
        if (data.status == 200) {
            window.location.href = "/examenes"
        }
    }
    return (
        <Grid container spacing={2} >
            <SimpleModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                mensaje="Llene los campos para agregar un nuevo examen"
                title="Agregar nuevo"
                defaultData={selected}
                clearDefaultData={() => setSelected(null)}
                fields={campos}
                onSubmit={(e) => {
                    if (e != null) {
                        e.value_type_name = buscar(e.value_type_id);
                        setDatos([...datos, e])
                    }
                }}
                onSubmitEdit={(e) => {
                    if (e != null) {
                        console.log(e)
                        e.value_type_name = buscar(e.value_type_id);
                        setDatos([ e,...datos.filter(item => item.id !== e.id)])
                    }
                }
            }
                />
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
                    label="Nombre"
                    error={Boolean(errors.name)}
                    {...register("name", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="name"
                />
            </Grid>
     {/*        <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Descripción"
                    error={Boolean(errors.description)}
                    {...register("description", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="description"
                />
            </Grid> */}
            <Grid item xs={12}>

                <Table columns={columns} data={datos} onAdd={agregar} />


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
