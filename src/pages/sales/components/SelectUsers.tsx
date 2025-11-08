import React from 'react'
import { useSale, useUsers } from '../../../shared/hooks'
import { Select } from '../../../shared/components'

const DEFAULT_VALUE = 'Usuarios'

export const SelectUsers: React.FC = () => {

    const { users } = useUsers()
    const { 
        filter: {isVisible}, 
        onChangePaginationVisibility,
        onSetFilterUser,
        onSetFilterPrices,
        filterSalesByUser,
        getAllSales,
    } = useSale()
    const userNames = users?.map( user => `${user.name} ${user.lastname}`) ?? []

    const onChange = (value: string) => {
        onSetFilterPrices(null, null, true)
        onChangePaginationVisibility(true)
        if ( value === DEFAULT_VALUE ) {
            getAllSales()
            onSetFilterUser(null, null, true)
            return
        }
        const user = users?.find( user => `${user.name} ${user.lastname}` === value )
        if ( !user ) return
        filterSalesByUser(user?.id, user?.name)
    }

    return (
        <>
            {
                isVisible && <Select 
                    onChange={onChange}
                    placeholder={DEFAULT_VALUE}
                    options={userNames}
                />
            }   
        </>
    )
}
