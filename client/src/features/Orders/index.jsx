import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { eliminarUsuario, obtenerUsuarios } from '../../services/api/users/users'
import Button from '@mui/material/Button'
import { useAuth } from '../../hooks/useAuth';
import { cerrarSesion } from '../../services/api/auth/login';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../components/table/Table'
import { Box, Breadcrumbs, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { eliminar, obtenerTodos } from '../../services/api/orders/orders';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const { isLoading, isError, data, error , refetch } = useQuery(['getOrdenes',usuario.token], obtenerTodos)
  const navigate = useNavigate();


  const eliminarRegistro = async (id) => {
    mostrarLoader(true)
    const data = await eliminar(id,usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data)
    refetch()
  }

  const columns = [
    {
      Header: 'Número',
      accessor: 'id',
    },
    {
      Header: 'Paciente',
      accessor: 'pacient',
      Cell: ({ row }) => (<span>{row.original.pacient?.names} {row.original.pacient?.last_names}</span>)
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
            navigate('/ordenes/editar', { state: { ...(value.row.original) } })
          }
          }>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={()=>eliminarRegistro(value.row.original.id)}>
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
      Órdenes
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
          {!isLoading && <Table columns={columns} data={!isLoading &&!isError? data.data : []} onAdd={() => navigate('/ordenes/crear')} />}

        </Grid>
      </Grid>
    </div>
  )
}

