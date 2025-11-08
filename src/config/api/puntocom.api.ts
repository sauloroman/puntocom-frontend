import axios from "axios";
import { getEnvVariables } from "../../shared/helpers";

const { VITE_BACKEND_URL, VITE_TOKEN_NAME } = getEnvVariables()

export const puntocomApiPublic = axios.create({
    baseURL: VITE_BACKEND_URL,
    timeout: 20000
})

export const puntocomApiPrivate = axios.create({
    baseURL: VITE_BACKEND_URL,
    timeout: 20000
})

puntocomApiPrivate.interceptors.request.use( (config) => {
    const token = JSON.parse(localStorage.getItem(VITE_TOKEN_NAME) ?? '')
    
    if ( token ) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
})