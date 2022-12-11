import { Autocomplete, Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
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
import { useQuery } from 'react-query';

import { useEffect } from 'react';
import { obtenerTodos } from '../../../services/api/pacients/pacients';
import { obtener } from '../../../services/api/exams/exams';
import { crear, editar, obtenerPorId } from '../../../services/api/orders/orders';

export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [datos, setDatos] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState(null)
    const { isLoading, isError, data, error, refetch } = useQuery(['getPacients', usuario.token], obtenerTodos)
    const { data: dataExams } = useQuery(['getExams', usuario.token], obtener)
    const [categories, setCategories] = useState([])
    const [valueTypes, setValueTypes] = useState([])
    const [pacient, setPacient] = useState('')

    useEffect(() => {
        if (state) {
            async function fetchData() {
               const data = await obtenerPorId(state.id, usuario.token)
                setPacient(state.pacient.id)
                setDatos(data.data)
            }
            fetchData()
        }
    }
        , [state])

    const columns = [
        {
            Header: 'Nombre',
            accessor: 'exam_name',
        },
        {
            Header: 'Categoría',
            accessor: 'category_name',
        },
        {
            Header: 'Acciones',
            accessor: 'action',
            Cell: (value) => (
                <div style={{ display: 'flex' }}>
                {/*     <IconButton aria-label="delete" onClick={() => {
                        setOpenModal(true)
                        setSelected(value.row.original)
                    }}>
                        <EditOutlined />
                    </IconButton> */}
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
            href="/ordenes"
        >
            Órdenes
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
            name: 'id',
            label: 'Examen',
            type: 'select',
            data: dataExams != null ? dataExams.data : [],
            style: { width: '100%' },
        }

    ];
    const buscar = (dt, datosItem) => {
        let item = datosItem.find(item => item.id == dt)
        return item;
    }
    const entrar = async () => {
        mostrarLoader(true)
        let dt = {
            id: state ? state.id : null,
            exams: datos,
            pacient_id: pacient
        }

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
            window.location.href = "/ordenes"
        }
    }
    const getName = (id, data) => {
        let object = null
        if (data != null) {
            data.data.map((e) => {
                if (id == e.id) {
                    object = { ...e }
                }
            })
        }

        return object
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
                        let obj = buscar(e.id, dataExams.data);
                        e.exam_name = obj.name;
                        e.category_name = obj.category.name;
                        setDatos([...datos, e])
                    }
                }}
                onSubmitEdit={(e) => {
                    if (e != null) {
                        let obj = buscar(e.id, dataExams.data);
                        e.exam_name = obj.name;
                        e.category_name = obj.category.name;
                        let newDatos = datos.slice().filter(item => item.id !== e.id)
                        setDatos([...newDatos, e])
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
                <Autocomplete
                    style={{ width: '100%' }}
                    options={data?.data}
                    value={getName(pacient, data)}
                    getOptionLabel={(option) => option.dni +" - "+ option.names + " " + option.last_names}
                    onChange={(event, value) => {
                        if (value != null) {
                            setPacient(value.id)
                        } else {
                            setPacient('')
                        }
                    }}
                    renderInput={params => (
                        <TextField {...params} label="Seleccione un paciente" variant="outlined" fullWidth />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Table columns={columns} data={datos} onAdd={agregar} />
            </Grid>
            <Grid item xs={12}>
                <Button
                    onClick={entrar}
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
