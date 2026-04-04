import { Roles } from '../interfaces/dto/user.interface'

export const roleAccess: Record<Roles, string[]> = {
  'Administrador': [
    '/', '/access', '/purchases', '/warehouse', '/sales',
    '/reports', '/settings', '/pos'
  ],

  'Supervisor': [
    '/warehouse', '/sales', '/purchases', '/reports'
  ],

  'Vendedor': [
    '/pos', '/warehouse'
  ]
}
