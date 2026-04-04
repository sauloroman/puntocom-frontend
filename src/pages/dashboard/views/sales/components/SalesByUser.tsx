import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import { useTheme } from '../../../../../shared/hooks'
import { formatMoney } from '../../../../../shared/helpers'
import { AvatarImage, AvatarInitialSquare } from '../../../../../shared/components/avatar'
import { UserRoleTag } from '../../../../access/views/users/components'
import type { Roles } from '../../../../../interfaces/dto/user.interface'
import { HeaderBox } from './HeaderBox';

interface UserStat {
    userId: string
    userName: string
    userImage: string
    role: string
    totalSales: number
    ordersCount: number
    averageOrderValue: number
    percentage: number
}

interface SalesByUserListProps {
    users: UserStat[]
}

export const SalesByUserList: React.FC<SalesByUserListProps> = ({ users }) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div
            className={`
        rounded-xl border p-5 flex flex-col gap-4
        ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}
      `}
        >
            <HeaderBox>
                <FaRegUser size={15} />
                Rendimiento por usuario
            </HeaderBox>

            <div className={`grid grid-cols-[1fr_auto_auto] gap-x-4 text-md font-medium pb-1 border-b
                ${isDark ? 'text-gray-500 border-gray-800' : 'text-gray-400 border-gray-100'}
            `}>
                <span>Vendedor</span>
                <span className='text-right mr-4'>Órdenes</span>
                <span className='text-right'>Total</span>
            </div>

            <div className='flex flex-col gap-2'>
                {users.map((u) => (
                    <div key={u.userId} className='grid grid-cols-[1fr_auto_auto] gap-x-4 items-center'>
                        <div className='flex items-center gap-2 min-w-0'>

                            {
                                u.userImage !== 'Usuario sin imagen'
                                ? ( <AvatarImage image={u.userImage} alt={u.userName} className='w-12 h-12' />)
                                : ( <AvatarInitialSquare className='w-12 h-12 text-[15px]' name={u.userName} /> ) 
                            }
                            <div className='min-w-0'>
                                <p className={`text-md mb-2 font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {u.userName}
                                </p>
                                <UserRoleTag role={u.role as Roles} />
                            </div>
                        </div>

                        <span className={`text-md text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {u.ordersCount}
                        </span>

                        <span className={`text-lg font-semibold text-right ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                            {formatMoney(u.totalSales, true)}
                        </span>
                    </div>
                ))}

                {!users.length && (
                    <p className={`text-sm text-center py-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        Sin datos de vendedores
                    </p>
                )}
            </div>
        </div>
    )
}