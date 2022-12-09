import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../hooks/useAuth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.jpg';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { removeSession } from '../../services/session/Session';
import { cerrarSesion } from '../../services/api/auth/login';
import { useLocation, useNavigate } from 'react-router-dom';
import indicador from '../../assets/indicador.png';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const {mostrarNotificacion,usuario,mostrarLoader,logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (usuario == null) {
    return props.children;
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const indicator = (<img src={indicador} alt="" srcset="" style={{width:10,height:15}}/>)

  const drawer = (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
     
      <div>
      <div style={{display:'flex',justifyContent:'center',marginBottom:10}}>
        <img src={logo2} alt="google" width={'80%'}/>
      </div>
      <Divider />
      <List>
      <ListItem disablePadding>
          {location.pathname.includes("/dashboard")&&(indicator)}
          <ListItemButton  onClick={()=>navigate("/dashboard")}>
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          {location.pathname.includes("/pacientes")&&(indicator)}
          <ListItemButton  onClick={()=>navigate("/pacientes")}>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={"Pacientes"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        {location.pathname.includes("/ordenes")&&(indicator)}
          <ListItemButton  onClick={()=>navigate("/ordenes")}>
            <ListItemIcon>
              <AssignmentIndOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Órdenes"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        {location.pathname.includes("/resultados")&&(indicator)}
          <ListItemButton onClick={()=>navigate("/resultados")}>
            <ListItemIcon>
              <MonitorHeartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Resultados"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        {location.pathname.includes("/examenes")&&(indicator)}
          <ListItemButton onClick={()=>navigate("/examenes")}>
            <ListItemIcon>
              <MedicalServicesOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Exámenes"} />
          </ListItemButton>
        </ListItem>
       
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
        {location.pathname.includes("/usuarios")&&(indicator)}
          <ListItemButton onClick={()=>navigate("/usuarios")}>
            <ListItemIcon>
              <SecurityOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Usuarios"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
      <div style={{display:'flex',justifyContent:'center',}}>
        <img src={logo} alt="google" width={'80%'}/>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const cerrar =async() => {
    mostrarLoader(true)
    const data = await cerrarSesion(usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data)
    if (data.status == 200) {
      logout()
      removeSession()
    }

  }
  return (
    <Box sx={{ 
      display: {sm:  'flex'}
  }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
         backgroundColor:'white'
        }}
        color="default"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div>
          <Typography variant="h6" noWrap component="div" color="primary">
          ClinicSystem
          </Typography>
          <Typography variant="body2" color="initial" sx={{color:'gray'}}>Sistema de laboratorio clínico</Typography>
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
          </Typography>
          <IconButton aria-label="delete" onClick={cerrar}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
