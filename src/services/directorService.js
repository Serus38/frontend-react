import { axiosInstance } from "../helper/axios-config";

const getDirectores = () => {
    return axiosInstance.get('director', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearDirector = (data) => {
    return axiosInstance.post('director', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarDirector = (data, directorId) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getDirectores, crearDirector, actualizarDirector
}