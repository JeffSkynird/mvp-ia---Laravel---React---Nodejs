import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import fondo from '../../assets/images/background3.jpg'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth'
import { iniciarSesion } from '../../services/api/auth/login';
import { guardarSession } from '../../services/session/Session';
import { encriptarJson } from '../../helpers/Encriptado';
import { useNavigate } from 'react-router-dom';
import logo2 from '../../assets/logo2.jpg';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
export default function Login() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  let navigate = useNavigate();
  const [alignment, setAlignment] = useState('personal');
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } ,setValue} = useForm({
    mode: 'onChange'
  });
  useEffect(() => {
    if (usuario != null) {
      navigate("/")
    }
  }
    , [usuario])

  const entrar = async (dt) => {
    mostrarLoader(true)
    let obj;
    if(alignment!="paciente"){
      obj= {
        email:dt.email,password:dt.password
      }
    }else{
      obj = {
        dni:dt.dni,password:dt.password
      }
    }
    const data = await iniciarSesion(obj)
    mostrarLoader(false)
    mostrarNotificacion(data)
    if (data.status == 200) {
      if(alignment == "paciente"){
        navigate('/consulta', { state: { pacient_id: data.pacient.id } })
      }else{
        let encrypt = encriptarJson(JSON.stringify({ user: data.user, token: data.token }))
        cargarUsuario(encrypt)
        guardarSession(encrypt);
      }
   
    }

  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    if(newAlignment!='paciente'){
      setValue('dni','')
    }
    
  };
  return (
    <Grid container sx={{ backgroundImage: `url(${fondo})`, height: '100vh', backgroundSize: 'cover' }}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper sx={{ height: '70vh', borderRadius: 2, width: { xs: '100%', md: '35%' }, padding: 3 }}>
          <Grid container spacing={2} >

            <Grid item xs={12}>

              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Iniciar Sesión <NavigateNextOutlinedIcon fontSize="small" /> <Chip variant="outlined" label={alignment == "paciente" ? "Paciente" : "Personal"} />
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Ingrese su usuario y contraseña
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                size='large'
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="personal" aria-label="left aligned">
                  <Tooltip title="Personal">
                    <AssignmentIndIcon fontSize="inherit" />
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="paciente" aria-label="centered">
                  <Tooltip title="Pacientes">
                    <PersonIcon fontSize="inherit" />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>


            {
              alignment == "personal" && (
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
              )
            }

            {
              alignment == "paciente" && (
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
              )
            }


            <Grid item xs={12}>
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.password)}
                  name="password"
                  {...register("password", {
                    required: "Required",
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
                Iniciar Sesión Ahora
              </Button>
            </Grid>
          </Grid>

        </Paper>
      </Grid>

    </Grid>
  )
}
