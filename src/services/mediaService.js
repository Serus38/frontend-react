import { axiosInstance } from "../helper/axios-config";

const getMedias = () => {
    return axiosInstance.get('media', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearMedia = (data) => {
    return axiosInstance.post('media', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });

}

const actualizarMedia = (mediaId,data) => {
    return axiosInstance.put(`media/${mediaId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });

}

const getMediaPorId = (mediaId) => {
    return axiosInstance.get(`media/${mediaId}`, {
        header: {
            'Content-Type': 'aplication/json'
        }
    });
}
export {
    getMedias, crearMedia, actualizarMedia, getMediaPorId
}