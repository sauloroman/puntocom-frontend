import type { Dispatch } from "@reduxjs/toolkit";
import type { UserRenewAuth, UserRequest, UserResponse } from "../../interfaces/user.interface";
import { login, setIsLoading } from "./auth.slice";
import { puntocomApiPrivate, puntocomApiPublic } from "../../config/api/puntocom.api";
import { getEnvVariables } from "../../shared/helpers";
import { showAlert } from "../alert/alert.slice";
import { AlertType } from "../../interfaces/ui/alert.interface";
import { handleError } from "../../config/api/handle-error";

const urlUsers = '/api/user'
const { VITE_TOKEN_NAME } = getEnvVariables()

export const startLoginUserWithEmailAndPassword = ( credentials: UserRequest ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch( setIsLoading( true ) )
        try {
            const { data } = await puntocomApiPublic.post<UserResponse>(`${urlUsers}/login`, credentials)
            const { user, token } = data

            localStorage.setItem(VITE_TOKEN_NAME, JSON.stringify(token))
            dispatch( login( user ) )
            dispatch( showAlert({
                title: '👋 Bievenido de vuelta',
                text: `${user.name} ${user.lastname}`,
                type: AlertType.success
            }))

        } catch( error ) {
            const errorMessage = handleError(error)
            dispatch(
                showAlert({
                    title: "⚠️ Error al iniciar sesión",
                    text: errorMessage,
                    type: AlertType.error,
                })
            );
        }
        
        dispatch( setIsLoading( false ) )
    }
}

export const startRenewingAuth = () => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))

        try {

            const { data } = await puntocomApiPrivate.get<UserRenewAuth>(`${urlUsers}/renew-token`)
            const { token, user } = data

            localStorage.setItem(VITE_TOKEN_NAME, JSON.stringify(token))
            dispatch( login( user ) )

        } catch( error ) {
            const errorMessage = handleError(error)
            dispatch(
                showAlert({
                    title: "⚠️ Inicia sesión nuevamente",
                    text: errorMessage,
                    type: AlertType.error,
                })
            );
        }

        dispatch(setIsLoading(false))

    }
}