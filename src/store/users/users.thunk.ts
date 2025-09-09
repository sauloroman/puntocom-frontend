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
    type UploadUserImage
} from "../../interfaces/user.interface"
import type { Dispatch } from "@reduxjs/toolkit"
import type { Pagination } from "../../interfaces/pagination.interface"

import { showAlert } from "../alert/alert.slice"
import { AlertType } from "../../interfaces/ui/alert.interface"
import { handleError } from "../../config/api/handle-error"
import { openModal, setModalMessage } from "../modal/modal.slice"
import { ModalNames } from "../../interfaces/ui/modal.interface"

const urlUser = '/api/user'

export const startCheckingAdminPass = (dataAdminPassword: CheckAdminPassword) => {
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
    return async ( dispatch: Dispatch ) => {
        dispatch(setIsLoading(true))
        try {

            const url = `${urlUser}/upload-image/${userId}`
            const { data } = await puntocomApiPrivate.patch<UploadUserImage>(url, files, { headers: { 'Content-Type': 'multipart/form-data'}})
            const { message, user } = data

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

export const startFilteringUsersByStatus = (pagination: Pagination, status: boolean) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            const url = `${urlUser}?page=${pagination.page}&limit=${pagination.limit}&sort=userCreatedAt:desc&filter={"userStatus": ${status}}`

            const { data } = await puntocomApiPrivate.get<GetUsersResponse>(url)
            const { meta, users } = data

            dispatch(setUsers(users))
            dispatch(setUsersMetaPagination({ ...meta, itemsPerPage: 10 }))

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startFilteringUsersByRole = (pagination: Pagination, role: Roles) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            const url = `${urlUser}?page=${pagination.page}&limit=${pagination.limit}&sort=userCreatedAt:desc&filter={"userRole": "${role}"}`

            const { data } = await puntocomApiPrivate.get<GetUsersResponse>(url)
            const { meta, users } = data

            dispatch(setUsers(users))
            dispatch(setUsersMetaPagination({ ...meta, itemsPerPage: 10 }))

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startGettingUsers = (pagination: Pagination) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            const { page, limit } = pagination

            const { data } = await puntocomApiPrivate.get<GetUsersResponse>(`${urlUser}?page=${page}&limit=${limit}&sort=userCreatedAt:desc`)

            const { meta, users } = data

            dispatch(setUsers(users))
            dispatch(setUsersMetaPagination({
                ...meta,
                itemsPerPage: 10
            }))

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export const startSearchingUsers = (userSearched: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {

            const { data } = await puntocomApiPrivate.get<GetUsersResponse>(`${urlUser}/search?sort=userName:asc&filter={"userName": "${userSearched}"}`)

            const { users } = data
            dispatch(setUsers(users))

        } catch (error) {
            console.log(error)
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
            console.log(error)
            dispatch(
                showAlert({
                    title: "⚠️ Error usuario",
                    text: 'No se pudo crear el usuario',
                    type: AlertType.error,
                })
            );
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}