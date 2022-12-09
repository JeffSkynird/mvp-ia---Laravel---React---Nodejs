import axios from 'axios'

export const obtener = async ({queryKey}) => {
    const [_, token] = queryKey
    let url = import.meta.env.VITE_API_URL+ "categories"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerPorId = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "categories/"+id
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const crear = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "categories"
    let setting = {
        method: "POST",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}`  }
    };
    const { data } = await axios(setting)
    return data;
};
export const editar = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "categories/"+ obj?.id
    let setting = {
        method: "POST",
        url: url,
        params: obj,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json' ,'Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const eliminar = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "categories/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

