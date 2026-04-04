import type { Roles } from "../dto/user.interface";

export const purchasesTabsAccess: Record<Roles, string[]> = {
    'Administrador': [
        'Registrar Compra',
        'Registro de compras',
        'Proveedores del sistema'
    ],
    'Supervisor': [
        'Registro de compras',
        'Proveedores del sistema'
    ],
    'Vendedor': []
}