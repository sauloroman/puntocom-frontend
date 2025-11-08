import React from 'react'
import type { Roles, User } from '../../../../../interfaces/user.interface'
import { TableActions, TableImage } from '../../../../../shared/components/table';
import { UserRoleTag } from './UserRoleTag';
import { UserValidateTag } from './UserValidateTag';
import { useDrawer, useUsers } from '../../../../../shared/hooks';
import { DrawelNames } from '../../../../../interfaces/ui/drawel.interface';
import { StatusBadge } from '../../../../../shared/components';
import { BsPerson, BsEnvelope, BsShield, BsToggleOn, BsCalendar3, BsClock, BsCheckCircle } from 'react-icons/bs';

interface TableUsersProps {
  data: User[]
}

export const TableUsers: React.FC<TableUsersProps> = ({ data }) => {

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
          <div className="border border-gray-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
              <div className="max-h-[650px] overflow-y-auto custom-scrollbar">
                  <table className="min-w-full bg-white">
                      <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs uppercase tracking-wide sticky top-0 z-10 shadow-sm">
                          <tr>
                              <th className="px-6 py-4 text-left font-bold">
                                  <div className="flex items-center gap-2">
                                      <BsPerson className="text-indigo-600" size={18} />
                                      Nombre Completo
                                  </div>
                              </th>
                              <th className="px-6 py-4 text-left font-bold">
                                  <div className="flex items-center gap-2">
                                      <BsEnvelope className="text-indigo-600" size={16} />
                                      Correo electrónico
                                  </div>
                              </th>
                              <th className="px-6 py-4 text-left font-bold">
                                  <div className="flex items-center gap-2">
                                      <BsShield className="text-indigo-600" size={16} />
                                      Rol
                                  </div>
                              </th>
                              <th className="px-6 py-4 text-left font-bold">
                                  <div className="flex items-center gap-2">
                                      <BsToggleOn className="text-indigo-600" size={18} />
                                      Estado
                                  </div>
                              </th>
                              <th className="px-6 py-4 text-left font-bold">
                                  <div className="flex items-center gap-2">
                                      <BsCalendar3 className="text-indigo-600" size={16} />
                                      Creado
                                  </div>
                              </th>
                              <th className="px-6 py-4 text-left font-bold">
                                  <div className="flex items-center gap-2">
                                      <BsClock className="text-indigo-600" size={16} />
                                      Actualizado
                                  </div>
                              </th>
                              <th className="px-6 py-4 text-left font-bold">
                                  <div className="flex items-center gap-2">
                                      <BsCheckCircle className="text-indigo-600" size={16} />
                                      Validado
                                  </div>
                              </th>
                              <th className="px-6 py-4 text-right font-bold">Acciones</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                          {data.length > 0 ? (
                              data.map((user) => (
                                  <tr key={user.id} className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200">
                                      <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                          <TableImage 
                                              width='w-6' 
                                              text='Usuario sin imagen' 
                                              icon={user.image} 
                                              initial={user.name[0]}
                                          /> 
                                          {user.name} {user.lastname}
                                      </td>
                                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                      <td className="px-6 py-4 text-gray-600"><UserRoleTag role={user.role as Roles} /></td>
                                      <td className="px-6 py-4"><StatusBadge status={user.isActive} /></td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{user.createdAt}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{user.updatedAt}</td>
                                      <td className='px-6 py-4'><UserValidateTag isValidated={user.isValidated} /></td>
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
                                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
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