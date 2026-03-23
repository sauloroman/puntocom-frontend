import React from 'react'
import { useUsers } from '../../../../../shared/hooks'
import { AppliedFilters, FilterRoleTag, FilterSearchTag, FilterStatusTag } from '../../../../../shared/components/filter'
import type { Roles } from '../../../../../interfaces/dto/user.interface'

export const AppliedUsersFilters: React.FC = () => {
    const { filter, onResetFilters } = useUsers()

    const hasFilters =
        filter.role !== null ||
        filter.status !== null ||
        filter.userName !== null

    return (
        <AppliedFilters 
            hasFilters={hasFilters} 
            onResetFilters={onResetFilters}
        >
            <FilterSearchTag
                search={filter.userName}
            />
            <FilterStatusTag 
                status={filter.status}
                statusLabel={filter.status}
            />
            <FilterRoleTag 
                role={filter.role as Roles}
            />
        </AppliedFilters>
    )
}