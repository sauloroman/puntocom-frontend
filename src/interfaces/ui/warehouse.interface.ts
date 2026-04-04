import type { Roles } from "../dto/user.interface";

export const warehouseTabsAccess: Record<Roles, string[]> = {
  'Administrador': [
    "Categorías",
    "Productos",
    "Control de Stock",
    "Ajustes de Almacén"
  ],

  'Supervisor': [
    "Categorías",
    "Productos",
    "Control de Stock"
  ],

  'Vendedor': [
    "Categorías",
    "Productos"
  ]
}
