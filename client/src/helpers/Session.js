import { encriptarJson} from '../helpers/Encriptado'
import { useContext } from 'react';
import Initializer from '../store/Initializer';
import { guardarSession } from '../services/session/Session';

export function guardarAutenticacion(response) {
    const {cargarUsuario} =  useContext(Initializer);
    let encrypt= encriptarJson(JSON.stringify({user:response.user,token: response.token}))
    cargarUsuario(encrypt)
    guardarSession(encrypt);
}