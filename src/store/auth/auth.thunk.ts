import type { Dispatch } from "@reduxjs/toolkit";
import type { UserRequest, UserResponse } from "../../interfaces/user.interface";
import { login, setIsLoading } from "./auth.slice";
import { puntocomApiPublic } from "../../config/api/puntocom.api";
import { getEnvVariables } from "../../shared/helpers";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import axios from "axios";

const urlUsers = '/api/user/login'
const { VITE_TOKEN_NAME } = getEnvVariables()

export const startLoginUserWithEmailAndPassword = ( credentials: UserRequest ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { data } = await puntocomApiPublic.post<UserResponse>(urlUsers, credentials)
            const { user, token } = data

            localStorage.setItem(VITE_TOKEN_NAME, JSON.stringify(token))
            dispatch( login( user ) )
            dispatch( showAlert({
                title: '👋 Bievenido de vuelta',
                text: `${user.name} ${user.lastname}`,
                type: AlertType.success
            }))

        } catch( error ) {
            let errorMessage = "Ocurrió un error inesperado";

            if (axios.isAxiosError(error) && error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            dispatch(
                showAlert({
                    title: "⚠️ Error al iniciar sesión",
                    text: errorMessage,
                    type: AlertType.error,
                })
            );

            console.error("Login error:", error);
        }
        
        dispatch( setIsLoading( false ) )
    }
}