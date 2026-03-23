import { useDispatch, useSelector } from "react-redux"
import { 
    startChangingUserStatus, 
    startCheckingAdminPass, 
    startCreatingUser, 
    startFilteringUsers, 
    startGettingAllUsers, 
    startUpdatingUser, 
    startUploadingUserImage 
} from "../../store/users/users.thunk"
import { 
    resetFilter,
    setHasEnteredPasswordCorrectly,
    setOrderedAsc, 
    setPage, 
    setRoleFilter, 
    setStatusFilter, 
    setTableView, 
    setUserNameFilter, 
    setUsers, 
    setUserSelected 
} from "../../store/users/users.slice"
import type { RootState } from "../../store"
import type { CheckAdminPassword, CreateUser, Roles, UpdateUser } from "../../interfaces/dto/user.interface"
import type { FilterUsers } from "../../interfaces/ui/filter.interface"

export const useUsers = () => {

    const dispatch = useDispatch<any>()

    const { 
        users, 
        allUsers,
        pagination, 
        isPaginationVisible,
        hasEnteredPasswordCorrectly,
        filter,
        isLoading,
        isTableStyleActive,
        userSelected,
        isOrderedAsc,
    } = useSelector((state: RootState) => state.users )

    const applyUserFilters = (
        page: number,
        limit: number,
        overrides?: Partial<FilterUsers>
    ) => {

        const current: FilterUsers = {
            role: filter.role,
            status: filter.status,
            userName: filter.userName
        }
        const applied: FilterUsers = {...current, ...overrides}
        const hasRoleFilter = applied.role !== null 
        const hasStatusFilter = applied.status !== null
        const hasUsernameFilter = applied.userName !== null
        
        if ( hasRoleFilter || hasStatusFilter || hasUsernameFilter ) {
            dispatch(startFilteringUsers(
                applied.role ?? undefined,
                applied.status ?? undefined,
                applied.userName ?? undefined,
                { page, limit }
            ))
        } else {
            dispatch(startFilteringUsers(
                undefined, 
                undefined, 
                undefined, 
                {page, limit}
            ))
        }
    }

    const onGetUsers = () => {
        dispatch(startFilteringUsers(
            undefined, 
            undefined, 
            undefined, 
        ))
    }

    const onGetAllUsers = () => {
        dispatch(startGettingAllUsers())
    }

    const onSetFilterUsersByStatus = (status: string | null) => {
        dispatch(setStatusFilter({ status }))
        dispatch(setPage(1))
        applyUserFilters(1, pagination.itemsPerPage, { status })
    }

    const onSetFilterUsersByRole = (role: Roles | null) => {
        dispatch(setRoleFilter({ role }))
        dispatch(setPage(1))
        applyUserFilters(1, pagination.itemsPerPage, { role })
    }

    const onSetFilterUsersByUserName = ( userName: string ) => {
        dispatch(setUserNameFilter({ userName }))
        dispatch(setPage(1))
        applyUserFilters(1, pagination.itemsPerPage, {userName})
    }

    const onResetFilters = () => {
        dispatch(resetFilter())
        dispatch(setPage(1))
        onGetUsers()
    }

    const onSetPage = ( page: number ) => {
        dispatch(setPage(page))
        applyUserFilters(page, pagination.itemsPerPage)
    }

    const onCreateUser = ( data: CreateUser ) => {
        dispatch( startCreatingUser(data) )
    } 

    const onCheckAdminPassword = ( data: CheckAdminPassword ) => {
        dispatch(startCheckingAdminPass({
            id: data.id,
            adminPassword: data.adminPassword
        } ))
    }

    const onResetEnteredAdminPassword = () => {
        dispatch(setHasEnteredPasswordCorrectly(false))
    }

    const onSetTableStyle = ( status: boolean ) => {
        dispatch( setTableView(status) )
    }

    const onSelectUser = ( id: string ) => {
        const user = users?.find( user => user.id === id )
        if ( user ) dispatch(setUserSelected(user))
    }

    const onChangeUserStatus = (id: string, status: boolean) => {
        dispatch(startChangingUserStatus(id, status))
    }

    const onUploadUserImage = (userId: string, files: FormData) => {
        dispatch(startUploadingUserImage(userId, files))
    }

    const onOrderAlpha = ( ordered: boolean ) => {
        dispatch(setOrderedAsc(ordered))
        onSortUsers()
    }    

    const onSortUsers = () => {
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

    const onUpdateUser = ( userId: string, userData: UpdateUser ) => {
        dispatch(startUpdatingUser(userId, userData))
    }

    return {
        allUsers,
        filter,
        hasEnteredPasswordCorrectly,
        isLoading,
        isOrderedAsc,
        isPaginationVisible,
        isTableStyleActive,
        pagination,
        users,
        userSelected,

        onChangeUserStatus,
        onCheckAdminPassword,
        onCreateUser,
        onGetAllUsers,
        onGetUsers,
        onOrderAlpha,
        onResetEnteredAdminPassword,
        onResetFilters,
        onSelectUser,
        onSetFilterUsersByRole,
        onSetFilterUsersByStatus,
        onSetFilterUsersByUserName,
        onSetPage,
        onSetTableStyle,
        onUpdateUser,
        onUploadUserImage,
    }

}