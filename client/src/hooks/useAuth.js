import { useContext, useEffect } from 'react';
import Initializer from '../store/Initializer';
import {desencriptarJson} from '../helpers/Encriptado'
export const useAuth = () => {
  const data =  useContext(Initializer);
  
  return {...data,usuario:data.usuario!=null?JSON.parse(desencriptarJson(data.usuario)):null};
};