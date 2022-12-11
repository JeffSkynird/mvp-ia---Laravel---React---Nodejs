import { Alert, Autocomplete, Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { EditOutlined, PhotoCamera, Visibility, VisibilityOff } from '@mui/icons-material'
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
import { editar } from '../../../services/api/results/results';
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
                const data = await obtenerResultadosId(state.id, usuario.token)
                setDatos(data.data)
            }
            fetchData()
        }
    }
        , [state])

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const getBase64 = (file, callback) => {
        let base;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            base = reader.result.toString()
            let base64 = base.slice(base.indexOf(',') + 1);
            callback(base64)
        };
        reader.onerror = function (error) {
        };
        return base;
    }




    const subir = (e, id) => {
        const file = e.target.files[0]
        getBase64(file, (valor) => {

            const data = datos.map((row) => {
                if (row.id == id) {
                    return { ...row, value: valor, txt: 1 };
                }
                return row;
            }
            )
            console.log(data)
            setDatos(data)
        });
    }

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
            field: 'exam_description',
            headerName: 'Detalle',
            width: 150,
            valueGetter: (params) =>
                params.row.exam.description
        },
        {
            field: 'exam_unity',
            headerName: 'Unidad',
            width: 150,
            valueGetter: (params) =>
                params.row.exam.unity
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
            editable: true,
            renderCell: (cellValues) => {
                return (

                    cellValues.row.exam.value_type.id !== 4 ?
                        cellValues.value
                        :
                        <IconButton color="primary" aria-label="upload picture" component="label" style={{ color: cellValues.row?.txt ? 'green' : 'auto' }} >
                            <input hidden accept="image/*" type="file" onChange={(e) => subir(e, cellValues.row.id)} />
                            <FileUploadIcon />

                        </IconButton>


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
            href="/resultados"
        >
            Resultados
        </Link>,
        <Typography key="3" color="text.primary">
            {state ? "Editar" : "Crear"}
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
        mostrarLoader(true)
        let dt = {
            results: datos,
            order_id: state.id
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
            window.location.href = "/resultados"
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
                <Alert severity="info">Ingresar los valores en función del tipo de dato</Alert>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ width: '100%' }}>
                    <DataGrid
                        rows={datos}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}

                        onCellEditCommit={handleCellEditCommit}
                        autoHeight
                        disableSelectionOnClick
                    />
                </Box>
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
