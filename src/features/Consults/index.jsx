import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { eliminarUsuario, obtenerUsuarios } from '../../services/api/users/users'
import Button from '@mui/material/Button'
import { useAuth } from '../../hooks/useAuth';
import { cerrarSesion } from '../../services/api/auth/login';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../components/table/Table'
import { AppBar, Box, Breadcrumbs, Chip, Grid, IconButton, Skeleton, Toolbar, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuIcon from '@mui/icons-material/Menu';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { eliminar, obtenerTodos, obtenerTodosPublic } from '../../services/api/orders/orders';
import { imprimirResultados } from '../../services/api/results/results';
export default function index() {
  const { state } = useLocation();
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const { isLoading, isError, data, error, refetch } = useQuery(['getPacientOrdenes', state?.pacient_id], obtenerTodosPublic)
  const navigate = useNavigate();


  const eliminarRegistro = async (id) => {
    mostrarLoader(true)
    const data = await eliminar(id)
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
      accessor: 'pacient.names',
      Cell: ({ row }) => (<span>{row.original.pacient.names} {row.original.pacient.last_names}</span>)
    },
    {
      Header: 'Creado en',
      accessor: 'created_at',
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{ display: 'flex' }}>
          <IconButton aria-label="delete" onClick={() => {

            imprimir(value.row.original.id)
          }

          }>
            <LocalPrintshopOutlinedIcon />
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
      Resultados de ordenes
    </Typography>,
  ];
  const imprimir = async (id) => {
    mostrarLoader(true)
    window.open(imprimirResultados(id), "_blank").focus(); // window.open + focus
    mostrarLoader(false)

  }
  const cerrar = () => {
    window.location.href = '/'
  }
  return (
    <div>
      <Box p={2}>
        <Grid container spacing={2} >


          <Grid item xs={12}>
            <AppBar
              position="fixed"
              sx={{


                backgroundColor: 'white'
              }}
              color="default"
              elevation={0}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"

                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <div>
                  <Typography variant="h6" noWrap component="div" color="primary">
                  ClinicSystem
                  </Typography>
                  <Typography variant="body2" color="initial" sx={{ color: 'gray' }}>Sistema de laboratorio clínico</Typography>
                </div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                </Typography>
                <IconButton aria-label="delete" onClick={cerrar}>
                  <LogoutIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>
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
            {!isLoading && <Table columns={columns} data={!isLoading && !isError ? data.data : []} />}

          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

