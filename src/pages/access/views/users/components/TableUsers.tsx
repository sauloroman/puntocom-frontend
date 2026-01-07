import React from 'react'
import { BsPerson, BsEnvelope, BsShield, BsToggleOn, BsCheckCircle, BsPhone } from 'react-icons/bs';
import type { Roles, User } from '../../../../../interfaces/dto/user.interface'
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface';
import { useDrawer, useTheme, useUsers } from '../../../../../shared/hooks';
import { TableActions, TableImage } from '../../../../../shared/components/table';;
import { StatusBadge } from '../../../../../shared/components/badgets';
import { UserRoleTag, UserValidateTag } from './';

interface TableUsersProps {
  data: User[]
}

export const TableUsers: React.FC<TableUsersProps> = ({ data }) => {

    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const { onOpenRightDrawer } = useDrawer()
    const { onSelectUser } = useUsers()

    const onSelectUserAc = (id: string) => {
        onOpenRightDrawer(DrawelNames.infoUser)
        onSelectUser( id )
    }

    const onEditUser = (id: string) => {
        onOpenRightDrawer(DrawelNames.editUser)
        onSelectUser(id)
    }

    return (
        <div
            className={`
                border rounded-2xl overflow-hidden mb-5 shadow-sm transition-colors
                ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}
            `}
        >
            <div className="max-h-[650px] overflow-y-auto custom-scrollbar no-scrollbar">
                <table className="min-w-full">
                    <thead
                        className={`
                            text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm
                            ${isDark
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700"
                            }
                        `}
                    >
                        <tr>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsPerson className={isDark ? "text-gray-300" : "text-indigo-600"} size={18} />
                                    Nombre Completo
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsEnvelope className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                                    Correo  
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsPhone className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                                    Teléfono
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsShield className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                                    Rol
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsToggleOn className={isDark ? "text-gray-300" : "text-indigo-600"} size={18} />
                                    Estado
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left font-bold">
                                <div className="flex items-center gap-2">
                                    <BsCheckCircle className={isDark ? "text-gray-300" : "text-indigo-600"} size={16} />
                                    Validado
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-bold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody
                        className={`
                            divide-y
                            ${isDark ? "divide-gray-700" : "divide-gray-100"}
                        `}
                    >
                        {data.length > 0 ? (
                            data.map((user) => (
                                <tr
                                    key={user.id}
                                    className={`
                                        transition-all duration-200
                                        ${
                                            isDark
                                                ? "hover:bg-gray-700/40 text-gray-300"
                                                : "hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 text-gray-900"
                                        }
                                    `}
                                >
                                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                                        <TableImage 
                                            width='w-6' 
                                            text='Usuario sin imagen' 
                                            icon={user.image} 
                                            initial={user.name[0]}
                                        /> 
                                        {user.name} {user.lastname}
                                    </td>
                                    <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                        {user.email}
                                    </td>
                                    <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                        {user.phone || 'Sin teléfono'}
                                    </td>
                                    <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                        <UserRoleTag role={user.role as Roles} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={user.isActive} />
                                    </td>
                                    <td className='px-6 py-4'>
                                        <UserValidateTag isValidated={user.isValidated} />
                                    </td>
                                    <td className="px-6 py-4 text-center relative">
                                        <TableActions
                                            onView={() => onSelectUserAc(user.id)}
                                            onEdit={() => onEditUser(user.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="px-6 py-16 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <div
                                            className={`
                                                w-16 h-16 rounded-full flex items-center justify-center mb-4
                                                ${isDark ? "bg-gray-700" : "bg-gray-100"}
                                            `}
                                        >
                                            <BsPerson className="text-gray-400" size={32} />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">
                                            No hay usuarios registrados
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Los usuarios aparecerán aquí una vez que se registren
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}