import axios from 'axios'

export const iniciarSesion = async (obj) => {
    let url = import.meta.env.VITE_API_URL+ "auth/login"
    let setting = {
        method: "POST",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json' }
    };
    const { data } = await axios(setting)
    return data;
};

export const cerrarSesion = async (token) => {
    let url = import.meta.env.VITE_API_URL + "auth/logout"
    let setting = {
        method: "POST",
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const { data } = await axios(setting)
    return data;
};
/* export const inicaiarSesion = (email, password, store, history) => {
    const { cargarUsuario, playSound, mostrarNotificacion, mostrarLoader } = store
    var raw = {
        "email": email,
        "password": password
    }
    let url = ENTRYPOINT + "auth/login"
    let setting = {
        method: "POST",
        url: url,
        data: raw,
        body: raw,
        headers: { 'Accept': 'application/json' }

    };
    mostrarLoader(true)

    axios(setting)
        .then((res) => {
            let response = res.data
            if (response.type != "error") {
                let user = {
                    user: response.user,
                    token: response.token
                }
                let encrypt = encriptarJson(JSON.stringify(user))

                cargarUsuario(encrypt)
                guardarSession(encrypt);
                mostrarLoader(false)
                mostrarNotificacion({ type: "success", message: response.message })

                if(response.user.type_user=="client"){
                  history.push('dashboard');
                }else{
                  history.push('dashboard_asesor');
                } 
                window.location.href = '/control/monitoreo';

            } else {
                mostrarNotificacion({ type: "error", message: response.message })
                mostrarLoader(false)

            }
        })
        .catch((error) => {
            mostrarLoader(false)




        });
}
export const cerararSesion = (store) => {
    const { usuario, logout, mostrarNotificacion, playSound, mostrarLoader } = store

    let url = ENTRYPOINT + "auth/logout"
    let setting = {
        method: "POST",
        url: url,

        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(desencriptarJson(usuario)).token
        }

    };
    mostrarLoader(true)

    axios(setting)
        .then((res) => {
            logout()
            removeSession()

            mostrarNotificacion({ type: "success", message: res.data.message })
            mostrarLoader(false)
            window.location.href = "/login"

        })
        .catch((error) => {
            mostrarLoader(false)

            let response = error.data


        });
} */