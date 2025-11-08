import React from 'react'
import { useSale, useUsers } from '../../../shared/hooks'
import { Select } from '../../../shared/components'

const DEFAULT_VALUE = 'Usuarios'

export const SelectUsers: React.FC = () => {

    const { users } = useUsers()
    
    const {
        getAllSales,
        onSetFilterUser,
        onResetFilters
    } = useSale()

    const userNames = users?.map(user => `${user.name} ${user.lastname}`) ?? []

    const onChange = (value: string) => {
        if (value === DEFAULT_VALUE) {
            getAllSales()
            onResetFilters()
            return
        }

        const user = users?.find(user => `${user.name} ${user.lastname}` === value)        
        if (!user) return

        onSetFilterUser(user.id, value)
    }

    return (
        <Select
            onChange={onChange}
            placeholder={DEFAULT_VALUE}
            options={userNames}
        />
    )
}
