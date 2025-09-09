import React from 'react'
import type { Roles, User } from '../../../../../interfaces/user.interface'
import { TableActions, TableImage, TableStatus, TableValidate } from '../../../../../shared/components/table';
import { UserRoleTag } from '../../../../../shared/components/user/UserRoleTag';

interface TableUsersProps {
  data: User[]
}

export const TableUsers: React.FC<TableUsersProps> = ({ data }) => {
   return (
          <div className="border border-gray-300 rounded-lg overflow-hidden mb-5">
              <div className="max-h-[650px] overflow-y-auto">
                  <table className="min-w-full bg-white text-sm">
                      <thead className="bg-gray-50 text-indigo-600 text-xs uppercase tracking-wide sticky top-0 z-10">
                          <tr>
                              <th className="px-4 py-3 text-left font-medium">Nombre Completo</th>
                              <th className="px-4 py-3 text-left font-medium">Correo electrónico</th>
                              <th className="px-4 py-3 text-left font-medium">Rol</th>
                              <th className="px-4 py-3 text-left font-medium">Estado</th>
                              <th className="px-4 py-3 text-left font-medium">Creado</th>
                              <th className="px-4 py-3 text-left font-medium">Actualizado</th>
                              <th className="px-4 py-3 text-left font-medium">Validado</th>
                              <th className="px-4 py-3 text-right font-medium">Acciones</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-xs">
                          {data.length > 0 ? (
                              data.map((user) => (
                                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                      <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                                          <TableImage 
                                              width='w-6' 
                                              text='Usuario sin imagen' 
                                              icon={user.image} 
                                              initial={user.name[0]}
                                          /> 
                                          {user.name} {user.lastname}
                                      </td>
                                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                      <td className="px-4 py-3 text-gray-600"><UserRoleTag role={user.role as Roles} /></td>
                                      <td className="px-4 py-3"><TableStatus status={user.isActive} /></td>
                                      <td className="px-4 py-3">{user.createdAt}</td>
                                      <td className="px-4 py-3">{user.updatedAt}</td>
                                      <td className='px-4 py-3'><TableValidate isValidated={user.isValidated} /></td>
                                      <td className="px-4 py-3 text-center relative">
                                          <TableActions
                                              onView={ () => {} }
                                              onEdit={() => {}}
                                          />
                                      </td>
                                  </tr>
                              ))
                          ) : (
                              <tr>
                                  <td
                                      colSpan={6}
                                      className="px-6 py-6 text-center text-gray-400 italic"
                                  >
                                      No hay categorías registradas
                                  </td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
      );
}
