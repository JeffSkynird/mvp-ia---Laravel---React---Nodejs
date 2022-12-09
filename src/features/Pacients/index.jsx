import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { eliminarUsuario } from '../../services/api/users/users'
import { useAuth } from '../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../components/table/Table'
import { Box, Breadcrumbs, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { eliminar, obtenerTodos } from '../../services/api/pacients/pacients';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
export default function index() {
  const { mostrarNotificacion, mostrarLoader, usuario } = useAuth();
  const { isLoading, isError, data, error , refetch } = useQuery(['getPacients',usuario.token], obtenerTodos)
  const navigate = useNavigate();


  const eliminarPaciente = async (id) => {
    mostrarLoader(true)
    const data = await eliminar(id,usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data)
    refetch()
  }

  const columns = [
    {
      Header: 'Cédula',
      accessor: 'dni',

    },
    {
      Header: 'Nombres',
      accessor: 'names',
    },
    {
      Header: 'Apellidos',
      accessor: 'last_names',
    },
    {
      Header: 'Correo',
      accessor: 'email',
    },
    {
      Header: 'Dirección',
      accessor: 'address',
    },
    {
      Header: 'Celular',
      accessor: 'phone',
    },
    {
      Header: 'Fecha de Nacimiento',
      accessor: 'born_date',
    },
    {
      Header: 'Creado en',
      accessor: 'created_at',
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{display:'flex'}}>
          <IconButton aria-label="delete" onClick={() => {
            navigate('/pacientes/editar', { state: { ...(value.row.original) } })
          }
          }>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete"  onClick={() => {
            navigate('/pacientes/resultados', { state: { ...(value.row.original) } })
          }
          }>
            <VisibilityOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={()=>eliminarPaciente(value.row.original.id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </div>

      )
    },
  ]
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
      SISTEMA
    </Link>,
    <Link
      underline="none"
      key="2"
      color="inherit"

    >
      Administración
    </Link>,
    <Typography key="3" color="text.primary">
      Pacientes
    </Typography>,
  ];
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} >
          {isLoading && (
            <Box >
              <Skeleton height={100} />
            </Box>
          )}
          {!isLoading && <Table columns={columns} data={!isLoading &&!isError? data.data : []} onAdd={() => navigate('/pacientes/crear')} />}

        </Grid>
      </Grid>
    </div>
  )
}

