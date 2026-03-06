import { puntocomApiPrivate } from "../../config/api/puntocom.api"
import { 
    addUser, 
    setHasEnteredPasswordCorrectly, 
    setIsLoading, 
    setUsers, 
    setUserSelected, 
    setUsersMetaPagination, 
    updateUser
} from "./users.slice"
import { 
    type CreateUserResponse, 
    type CreateUser, 
    type GetUsersResponse, 
    type CheckAdminPassword, 
    type Roles, 
    type ChangeUserStatusResponse,
    type UploadUserImage,
    type UpdateUser,
    type UpdateUserResponse,
} from "../../interfaces/dto/user.interface"
import type { Dispatch } from "@reduxjs/toolkit"
import type { Pagination } from "../../interfaces/dto/pagination.interface"

import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { handleError } from "../../config/api/handle-error"
import { openModal, setModalMessage } from "../modal/modal.slice"
import { ModalNames } from "../../interfaces/ui/modal.interface"
import type { RootState } from "../store"
import { login } from "../auth/auth.slice"

const urlUser = '/api/user'

export const startCheckingAdminPass = (dataAdminPassword: CheckAdminPassword ) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            await puntocomApiPrivate.post(`${urlUser}/check-admin-password`, dataAdminPassword)
            dispatch(setHasEnteredPasswordCorrectly(true))
        } catch (error) {
            const errorMessage = handleError(error)
            dispatch(
                showAlert({
                    title: "⚠️ Error confirmando contraseña",
                    text: errorMessage,
                    type: AlertType.error,
                })
            )
            dispatch(setHasEnteredPasswordCorrectly(false))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startChangingUserStatus = ( userId: string, status: boolean ) => {
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading( true ))
        try {
            
            const { data } = await puntocomApiPrivate.patch<ChangeUserStatusResponse>(`${urlUser}/${status ? 'activate' : 'deactivate'}/${userId}`)

            const { message, user } = data

            dispatch(updateUser({ userId, user }))
            dispatch(setUserSelected(user))
            dispatch(showAlert({
                title: 'Cambio de estado',
                text: message,
                type: AlertType.success 
            }))

        } catch(error) {
            dispatch(
                showAlert({
                    title: `⚠️ Error cambio estado del usuario`,
                    text: `No se pudo ${status ? 'activar' : 'desactivar'} el usuario`,
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading( false ))
        }
    }
}

export const startUploadingUserImage = ( userId: string, files: FormData ) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {   

            const url = `${urlUser}/upload-image/${userId}`
            const { data } = await puntocomApiPrivate.patch<UploadUserImage>(url, files, { headers: { 'Content-Type': 'multipart/form-data'}})
            const { message, user } = data

            const { auth: { user: userLogged } } = getState()
            
            if ( userLogged?.id === user.id ) {
                dispatch(login(user))
            }

            dispatch(updateUser({ userId, user }))
            dispatch(setUserSelected(user))
            dispatch(showAlert({
                title: 'Imagen Subida',
                text: message,
                type: AlertType.success
            }))

        } catch(error) {
            dispatch(showAlert({
                title: '⚠️ Error imagen usuario',
                text: 'No se pudo subir la imagen',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startFilteringUsers = (
    role?: Roles,
    status?: string,
    userName?: string,
    pagination?: Pagination
) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {
            const { pagination: {itemsPerPage}} = getState().users

            const params: any = {
                page: pagination?.page.toString() ?? '1',
                limit: pagination?.limit.toString() ?? itemsPerPage.toString()
            }

            if ( role ) {
                params['role'] = role.toString()
            }

            if ( status ) {
                params['status'] = status === 'Activo' ? 1 : 0
            }

            if ( userName ) {
                params['userName'] = userName.trim()
            }

            const { data } = await puntocomApiPrivate.get<GetUsersResponse>(`${urlUser}/filter`, { params })
            const { meta, users } = data
            const { filter, ...restPagination } = meta
            
            dispatch(setUsers(users))
            dispatch(setUsersMetaPagination({ ...restPagination, itemsPerPage }))

        } catch(error) {
            dispatch(showAlert({
                title: '⚠️ Error filtrando usuarios',
                text: 'No fue posible filtrar los usuarios',
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startCreatingUser = (userData: CreateUser) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            const { data } = await puntocomApiPrivate.post<CreateUserResponse>(urlUser, userData)
            const { message, user } = data

            dispatch(addUser(user))
            dispatch(openModal(ModalNames.emailSentToUser))
            dispatch(setModalMessage(message))

        } catch (error) {
            const errorMessage = handleError(error)
            dispatch(
                showAlert({
                    title: "⚠️ Error registrar usuario",
                    text: errorMessage,
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startUpdatingUser = (userId: string, userData: UpdateUser ) => {
    return async ( dispatch: Dispatch, getState: () => RootState ) => {
        dispatch(setIsLoading(true))
        try {

            const url = `${urlUser}/${userId}`
            const { data } = await puntocomApiPrivate.put<UpdateUserResponse>(url, userData)
            const { message, user } = data

            const { auth: { user: userLogged } } = getState()
            
            if ( userLogged?.id === user.id ) {
                dispatch(login(user))
            }

            dispatch(updateUser({userId, user}))
            dispatch(setUserSelected(user))
            dispatch(showAlert({
                title: `${user.name} ${user.lastname}`,
                text: message,
                type: AlertType.success
            }))

        } catch(error) {
            const errorMessage = handleError(error)
            dispatch(showAlert({
                title: '⚠️ No se pudo actualizar el usuario',
                text: errorMessage,
                type: AlertType.error
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}