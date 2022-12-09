import React from 'react'
import Initializer from './Initializer'
import { useNavigate, useLocation } from "react-router-dom";

export default function Propager(props) {
    let history = useNavigate();
    let location = useLocation();
    const { usuario, cargarUsuario } = React.useContext(Initializer)
    React.useEffect(() => {
        if (usuario == null) {
            let auth = localStorage.getItem("auth");
            if (auth != null) {
                cargarUsuario(auth)
            } else {
                if (location.pathname.pathname != "/login"&&location.pathname.pathname != "/consulta") {
                    history("/login")
                }
            }
        } else {
            window.location.href = "/"
        }
    }, [])
    return (
        props.children
    )
}
