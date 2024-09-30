import { axiosInstance } from "../helper/axios-config";

const getGeneros = () => {
    return axiosInstance.get('genero', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearGenero = (data) => {
    return axiosInstance.post('genero', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarGenero = (data, generoId) => {
    return axiosInstance.put(`genero/${generoId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getGeneros, crearGenero, actualizarGenero
}