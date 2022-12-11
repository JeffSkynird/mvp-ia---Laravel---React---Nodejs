import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { eliminarUsuario, obtenerUsuarios } from '../../services/api/users/users'
import Button from '@mui/material/Button'
import { useAuth } from '../../hooks/useAuth';
import { cerrarSesion } from '../../services/api/auth/login';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../components/table/Table'
import { Alert, Avatar, Box, Breadcrumbs, Card, CardContent, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import noValue from '../../assets/noValue.svg'
import BarVertical from './components/BarVertical'
import PieChart from './components/PieChart'
import { useEffect } from 'react';
import { obtener, obtenerGrafico1, obtenerGrafico2 } from '../../services/api/kpis/kpis';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [kpis,setKpis ]= useState(null)
  const [data1,setData1 ]= useState({label:[],value:[]})
  const [data2,setData2 ]= useState({label:[],value:[]})

  const navigate = useNavigate();

  useEffect(()=>{
    const fetching = async (id) => {
      const data = await obtener()
      const resp2 = await obtenerGrafico1()
      const resp3 = await obtenerGrafico2();
      let label = []
      let value = []
      Object.keys(resp2.data).forEach(function(key, index) {
        
        label.push(key)
        value.push(resp2.data[key] )
      });

      let label2 = []
      let value2 = []
      Object.keys(resp3.data).forEach(function(key, index) {
        
        label2.push(key)
        value2.push(resp3.data[key] )
      });

      console.log(label2)
      console.log(value2)
      setData1({label,value});
      setData2({label:label2,value:value2});

      setKpis(data.data)
    }
    fetching()
  },[])

  const eliminar = async (id) => {
    mostrarLoader(true)
    const data = await eliminarUsuario(id)
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
      Header: 'Creado en',
      accessor: 'created_at',
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{ display: 'flex' }}>
          <IconButton aria-label="delete" onClick={() => {
            navigate('/usuarios/editar', { state: { ...(value.row.original) } })
          }
          }>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => eliminar(value.row.original.id)}>
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
      Usuarios
    </Typography>,
  ];
  return (
    <div>
      <Grid container spacing={2}>

        <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" >
            Dashboard <span style={{ color: '#4527a0' }}></span>
          </Typography>

        </Grid>

        <Grid item xs={12} md={12} >
          <Grid container spacing={2}>

            <Grid item xs={12} md={4}>
              <Card style={{ width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#5e35b1', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#5e35b1', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit" >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#4527a0', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {kpis != null ? kpis.pacients : 0}
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Número pacientes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#1e88e5', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#5e35b1', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit" >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#1362A7', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {kpis != null ? kpis.orders1 : 0}
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Órdenes efectuadas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#4DB48D', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#5e35b1', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit" >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ marginTop: 5, backgroundColor: '#2E6A54', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {kpis != null ? kpis.orders2 : 0}
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Órdenes pendientes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={6} xs={12}>
              <div style={{ marginTop: 15 }} >

                {
                  data1.label != 0 && data1.value != 0 ? (
                    <BarVertical label={data1.label} value={data1.value} text="Órdenes efectuadas en los últimos tres meses" />
                  )
                    :
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={noValue} width={150} height={150} alt="" srcset="" />
                      <p>No hay registros</p>
                    </div>
                }
              </div>


            </Grid>
            <Grid item md={6} xs={12}>
              <div style={{ marginTop: 15 }} >
                
                {
                  data2.label != 0 && data2.value != 0 ? (
                    <PieChart label={data2.label} value={data2.value} text="Los tres exámenes más solicitados" />
                  )
                    :
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={noValue} width={150} height={150} alt="" srcset="" />
                      <p>No hay registros</p>
                    </div>
                }
              </div>


            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

