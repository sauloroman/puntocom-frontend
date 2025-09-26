import { useDispatch, useSelector } from "react-redux"
import { 
    startChangingUserStatus, 
    startCheckingAdminPass, 
    startCreatingUser, 
    startFilteringUsersByRole, 
    startFilteringUsersByStatus, 
    startGettingUsers, 
    startSearchingUsers, 
    startUpdatingUser, 
    startUploadingUserImage 
} from "../../store/users/users.thunk"
import { 
    setHasEnteredPasswordCorrectly,
    setOrderedAsc, 
    setPage, 
    setPaginationVisible, 
    setRoleFilter, 
    setStatusFilter, 
    setTableView, 
    setUsers, 
    setUserSelected 
} from "../../store/users/users.slice"
import type { RootState } from "../../store"
import type { CheckAdminPassword, CreateUser, Roles, UpdateUser } from "../../interfaces/user.interface"

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
        userSelected,
        isOrderedAsc,
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
        dispatch(startCheckingAdminPass({
            id: data.id,
            adminPassword: data.adminPassword
        } ))
    }

    const resetEnteredAdminPassword = () => {
        dispatch(setHasEnteredPasswordCorrectly(false))
    }

    const onChangePaginationVisibility = (isVisible: boolean) => {
        dispatch(setPaginationVisible(isVisible))
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

    const onOrderAlpha = ( ordered: boolean ) => {
        dispatch(setOrderedAsc(ordered))
        sortUsers()
    }    

    const sortUsers = () => {
        const usersSorted = [...users!].sort((a, b) => {
            const fullNameA = `${a.name} ${a.lastname}`.toLowerCase();
            const fullNameB = `${b.name} ${b.lastname}`.toLowerCase();

            if (isOrderedAsc) {
                return fullNameA.localeCompare(fullNameB);
            } else {
                return fullNameB.localeCompare(fullNameA);
            }
        });

        dispatch(setUsers(usersSorted ?? []))
    }

    const updateUser = ( userId: string, userData: UpdateUser ) => {
        dispatch(startUpdatingUser(userId, userData))
    }

    return {
        filter,
        hasEnteredPasswordCorrectly,
        isLoading,
        isOrderedAsc,
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
        onChangeUserStatus,
        onOrderAlpha,
        onSearchUser,
        onSelectUser,
        onSetFilterRole,
        onSetFilterStatus,
        onSetPage,
        setTableStyle,
        sortUsers,
        updateUser,
        uploadUserImage,
        resetEnteredAdminPassword,
    }

}