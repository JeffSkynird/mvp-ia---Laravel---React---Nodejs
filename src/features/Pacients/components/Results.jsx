import { Alert, Autocomplete, Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
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
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { obtenerTodos } from '../../../services/api/pacients/pacients';
import { obtener } from '../../../services/api/exams/exams';
import { obtenerResultadosId } from '../../../services/api/orders/orders';
import { Box } from '@mui/system';
import { editar, obtenerResultadosPorPaciente } from '../../../services/api/results/results';

export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [datos, setDatos] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState(null)
    const { isLoading, isError, data, error, refetch } = useQuery(['getPacients', usuario.token], obtenerTodos)
    const { data: dataExams } = useQuery(['getExams', usuario.token], obtener)
    const handleCellEditCommit = React.useCallback(
        ({ id, field, value }) => {
            const updatedRows = datos.map((row) => {
                if (row.id === id) {
                    return { ...row, [field]: value };
                }
                return row;
            });
            setDatos(updatedRows);
        },
        [datos],
    );
    useEffect(() => {
        if (state) {
            async function fetchData() {
                const data = await obtenerResultadosPorPaciente(state.id, usuario.token)
                setDatos(data.data)
            }
            fetchData()
        }
    }
        , [state])

    const columns = [
        {
            field: 'category_name',
            headerName: 'Categoría',
            width: 150,
            valueGetter: (params) => {
                return params.row.exam.category.name;
            }

        },
        {
            field: 'exam_name',
            headerName: 'Nombre',
            width: 150,
            valueGetter: (params) =>
                params.row.exam.name,
        },
        {
            field: 'value_type_name',
            headerName: 'Tipo de valor',
            width: 150,
            valueGetter: (params) =>
                params.row.exam.value_type.name,
        },
        {
            field: 'value',
            headerName: 'Valor',
            width: 150,
            renderCell: (cellValues) => {
                return (
                 
                        cellValues.row.exam.value_type.id !== 4 ?
                            cellValues.value
                            :
                            <Link href={cellValues.row.value}  underline="none"  target="_blank">
                               Ver archivo
                            </Link>
                           
                 
                );
            }
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
            href="/pacientes"
        >
            Resultados
        </Link>,
        <Typography key="3" color="text.primary">
            Consulta
        </Typography>,
    ];
    const eliminarExamen = (id) => {
        if (!id) {
            const newDatos = datos.filter(item => item.id !== id)
            setDatos(newDatos)
        }
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

        window.location.href = "/pacientes"

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
            <Grid item xs={12}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="info">Para ingresar valores diríjase a la sección <a style={{ textDectoration: 'none', fontWeight: 'bold', color: 'black' }} href="/resultados">resultados</a></Alert>

            </Grid>
            <Grid item xs={12}>
                <Box sx={{ width: '100%' }}>
                    <DataGrid
                        rows={datos}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        disableSelectionOnClick
                        rowGroupingColumnMode="single"
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>

                <Button
                    onClick={entrar}
                    fullWidth

                    variant="contained"
                    color="inherit"
                >
                    Atrás
                </Button>

            </Grid>
        </Grid>
    )
}
