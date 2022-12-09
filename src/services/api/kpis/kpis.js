import axios from 'axios'

export const obtener = async () => {
    let url = import.meta.env.VITE_API_URL+ "kpis"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json'}
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerGrafico1 = async () => {
    let url = import.meta.env.VITE_API_URL+ "graph1"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json'}
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerGrafico2 = async () => {
    let url = import.meta.env.VITE_API_URL+ "graph2"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json'}
    };
    const { data } = await axios(setting)
    return data;
};

