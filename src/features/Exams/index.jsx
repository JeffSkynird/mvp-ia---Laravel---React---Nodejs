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
import { eliminar, obtener } from '../../services/api/categories/categories';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const { isLoading, isError, data, error , refetch } = useQuery(['getCategories',usuario.token], obtener)
  const navigate = useNavigate();


  const eliminarCategories = async (id) => {
    mostrarLoader(true)
    const data = await eliminar(id,usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data)
    refetch()
  }

  const columns = [
    {
      Header: 'Categoría',
      accessor: 'name',
    },
  
    {
      Header: 'Exámenes',
      accessor: 'exams_count',
      Cell: (value) => (
        <Chip label={value.row.original.exams_count} />
      )
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
            navigate('/examenes/editar', { state: { ...(value.row.original) } })
          }
          }>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={()=>eliminarCategories(value.row.original.id)}>
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
      Exámenes
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
          {!isLoading && <Table columns={columns} data={!isLoading &&!isError? data.data : []} onAdd={() => navigate('/examenes/crear')} />}

        </Grid>
      </Grid>
    </div>
  )
}

