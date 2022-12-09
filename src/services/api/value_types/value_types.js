import axios from 'axios'

export const obtener = async ({queryKey}) => {
    const [_, token] = queryKey
    let url = import.meta.env.VITE_API_URL+ "value_types"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const crear = async (obj) => {
    let url = import.meta.env.VITE_API_URL+ "value_types"
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
export const editar = async (obj) => {
    let url = import.meta.env.VITE_API_URL+ "value_types/"+ obj?.id
    let setting = {
        method: "PUT",
        url: url,
        params: obj,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json' }
    };
    const { data } = await axios(setting)
    return data;
};
export const eliminar = async (id) => {
    let url = import.meta.env.VITE_API_URL+ "value_types/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json' }
    };
    const { data } = await axios(setting)
    return data;
};

