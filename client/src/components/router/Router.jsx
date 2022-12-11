import { Route, Routes } from 'react-router-dom'
import Login from '../../features/Login'
import Consulta from '../../features/Consults'

import Users from '../../features/Users'
import UserForm from '../../features/Users/components/Form'

import Pacients from '../../features/Pacients'
import PacientForm from '../../features/Pacients/components/Form'
import Orders from '../../features/Orders'
import OrdersForm from '../../features/Orders/components/Form'
import Exam from '../../features/Exams'
import ExamForm from '../../features/Exams/components/Form'
import Result from '../../features/Results'
import ResultForm from '../../features/Results/components/Form'
import RequireAuth from '../auth/RequireAuth'
import PacientResults from '../../features/Pacients/components/Results'
import Dashboard from '../../features/Dashboard'


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<RequireAuth><Users/></RequireAuth>} />
            <Route path="/usuarios" element={<RequireAuth><Users/></RequireAuth>} />
            <Route path="/usuarios/crear" element={<RequireAuth><UserForm/></RequireAuth>} />
            <Route path="/usuarios/editar" element={<RequireAuth><UserForm/></RequireAuth>} />
          
            <Route path="/pacientes" element={<RequireAuth><Pacients/></RequireAuth>} />
            <Route path="/pacientes/crear" element={<RequireAuth><PacientForm/></RequireAuth>} />
            <Route path="/pacientes/editar" element={<RequireAuth><PacientForm/></RequireAuth>} />

            <Route path="/ordenes" element={<RequireAuth><Orders/></RequireAuth>} />
            <Route path="/ordenes/crear" element={<RequireAuth><OrdersForm/></RequireAuth>} />
            <Route path="/ordenes/editar" element={<RequireAuth><OrdersForm/></RequireAuth>} />

            <Route path="/examenes" element={<RequireAuth><Exam/></RequireAuth>} />
            <Route path="/examenes/crear" element={<RequireAuth><ExamForm/></RequireAuth>} />
            <Route path="/examenes/editar" element={<RequireAuth><ExamForm/></RequireAuth>} />

            <Route path="/resultados" element={<RequireAuth><Result/></RequireAuth>} />
            <Route path="/resultados/crear" element={<RequireAuth><ResultForm/></RequireAuth>} />
            <Route path="/resultados/editar" element={<RequireAuth><ResultForm/></RequireAuth>} />
            <Route path="/pacientes/resultados" element={<RequireAuth><PacientResults/></RequireAuth>} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="login" element={<Login />} />
            <Route path="consulta" element={<Consulta />} />
            <Route render={() => <Redirect to="/usuarios" />} />
        </Routes>
    )
}
