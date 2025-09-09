import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { startChangingUserStatus, startCheckingAdminPass, startCreatingUser, startFilteringUsersByRole, startFilteringUsersByStatus, startGettingUsers, startSearchingUsers, startUploadingUserImage } from "../../store/users/users.thunk"
import { setHasEnteredPasswordCorrectly, setPage, setPaginationVisible, setRoleFilter, setStatusFilter, setTableView, setUserSelected } from "../../store/users/users.slice"
import type { CheckAdminPassword, CreateUser, Roles } from "../../interfaces/user.interface"

export const useUsers = () => {

    const dispatch = useDispatch<any>()

    const { 
        users, 
        pagination, 
        isPaginationVisible,
        hasEnteredPasswordCorrectly,
        filter,
        isLoading,
        isTableStyleActive,
        userSelected
    } = useSelector((state: RootState) => state.users )

    const getUsers = () => {
        dispatch(startGettingUsers({
            page: 1,
            limit: pagination.itemsPerPage
        }))
    }

    const filterUsersByStatus = (status: boolean) => {
        dispatch(setStatusFilter({ status, isVisible: true }))
        dispatch(startFilteringUsersByStatus({
            page: 1,
            limit: pagination.itemsPerPage,
        }, status ))
    }

    const filterUsersByRole = (role: Roles) => {
        dispatch(setRoleFilter({ role, isVisible: true }))
        dispatch(startFilteringUsersByRole({
            page: 1,
            limit: pagination.itemsPerPage
        }, role))
    }

    const onSetPage = ( page: number ) => {
        dispatch(setPage(page))

        if ( filter.status !== null ) {
            dispatch(startFilteringUsersByStatus({
                page,
                limit: pagination.itemsPerPage,
            }, filter.status))
        } else if ( filter.role !== null ) {
            dispatch(startFilteringUsersByRole({
                page,
                limit: pagination.itemsPerPage,
            }, filter.role))
        } else {
            dispatch(startGettingUsers({page, limit: pagination.itemsPerPage }))
        }
    }

    const onSetFilterStatus = (status: boolean | null, isVisible: boolean ) => {
        dispatch(setStatusFilter({ status, isVisible }))
    }

    const onSetFilterRole = ( role: Roles | null, isVisible: boolean ) => {
        dispatch(setRoleFilter({role, isVisible}))
    }

    const createUser = ( data: CreateUser ) => {
        dispatch( startCreatingUser(data) )
    } 

    const checkAdminPassword = ( data: CheckAdminPassword ) => {
        dispatch( startCheckingAdminPass( data ) )
    }

    const onChangePaginationVisibility = (isVisible: boolean) => {
        dispatch(setPaginationVisible(isVisible))
    }

    const resetConfirmAdminPasswordStatus = () => {
        dispatch( setHasEnteredPasswordCorrectly( false ))
    }

    const onSearchUser = ( userSearched: string ) => {
        dispatch(startSearchingUsers(userSearched))
    }

    const setTableStyle = ( status: boolean ) => {
        dispatch( setTableView(status) )
    }

    const onSelectUser = ( id: string ) => {
        const user = users?.find( user => user.id === id )
        if ( user ) dispatch(setUserSelected(user))
    }

    const onChangeUserStatus = (id: string, status: boolean) => {
        dispatch(startChangingUserStatus(id, status))
    }

    const uploadUserImage = (userId: string, files: FormData) => {
        dispatch(startUploadingUserImage(userId, files))
    }

    return {
        filter,
        hasEnteredPasswordCorrectly,
        isLoading,
        isPaginationVisible,
        isTableStyleActive,
        pagination,
        users,
        userSelected,

        checkAdminPassword,
        createUser,
        filterUsersByRole,
        filterUsersByStatus,
        getUsers,
        onChangePaginationVisibility,
        onSearchUser,
        onSetFilterRole,
        onSetFilterStatus,
        onSetPage,
        onSelectUser,
        resetConfirmAdminPasswordStatus,
        setTableStyle,
        onChangeUserStatus,
        uploadUserImage
    }

}