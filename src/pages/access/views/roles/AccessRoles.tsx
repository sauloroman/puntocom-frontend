import React from 'react'
import { FaCrown, FaUserShield, FaUserTie } from "react-icons/fa"
import type { RoleCardData } from "../../../../interfaces/ui/role.interface"
import { RoleCard } from "./components"
import { useAuth, useTheme } from "../../../../shared/hooks"

export const AccessRoles: React.FC = () => {
    const { theme } = useTheme()
    const {user} = useAuth()
    const isDark = theme === "dark"

    const rolesData: RoleCardData[] = [
        {
            title: 'Vendedor',
            subtitle: 'Acceso básico para operaciones de venta',
            icon: <FaUserTie />,
            color: 'text-blue-600',
            darkColor: 'text-blue-400',
            bgColor: 'bg-blue-100',
            darkBgColor: 'bg-blue-900/30',
            highlighted: user?.role === 'Vendedor',
            permissions: [
                { permission: 'Iniciar nueva venta', included: true },
                { permission: 'Agregar productos a venta', included: true },
                { permission: 'Modificar cantidad de productos', included: true },
                { permission: 'Eliminar productos de venta', included: true },
                { permission: 'Aplicar descuentos', included: true },
                { permission: 'Finalizar y registrar ventas', included: true },
                { permission: 'Generar tickets de venta', included: true },
                { permission: 'Consultar ventas propias', included: true },
                { permission: 'Consultar inventario general', included: true },
                { permission: 'Buscar productos específicos', included: true },
                { permission: 'Gestionar productos', included: false },
                { permission: 'Gestionar usuarios', included: false },
                { permission: 'Ver reportes generales', included: false },
                { permission: 'Registrar compras', included: false },
                { permission: 'Gestionar proveedores', included: false },
            ],
        },
        {
            title: 'Administrador',
            subtitle: 'Control total del sistema',
            icon: <FaCrown />,
            color: 'text-purple-600',
            darkColor: 'text-purple-400',
            bgColor: 'bg-purple-100',
            darkBgColor: 'bg-purple-900/30',
            highlighted: user?.role === 'Administrador',
            permissions: [
                { permission: 'Todos los permisos de Supervisor', included: true },
                { permission: 'Registrar usuarios en el sistema', included: true },
                { permission: 'Actualizar perfil de usuarios', included: true },
                { permission: 'Desactivar/Activar usuarios', included: true },
                { permission: 'Gestionar roles y permisos', included: true },
                { permission: 'Cancelar/Anular compras', included: true },
                { permission: 'Ajustar stock manualmente', included: true },
                { permission: 'Consultar historial de movimientos', included: true },
                { permission: 'Eliminar categorías', included: true },
                { permission: 'Eliminar proveedores (baja lógica)', included: true },
                { permission: 'Consultar historial de compras por proveedor', included: true },
                { permission: 'Generar todos los reportes del sistema', included: true },
                { permission: 'Exportar reportes en PDF', included: true },
                { permission: 'Configurar parámetros del sistema', included: true },
                { permission: 'Respaldar y restaurar base de datos', included: true },
                { permission: 'Consultar logs del sistema', included: true },
                { permission: 'Gestionar información del negocio', included: true },
                { permission: 'Acceso completo a todas las funcionalidades', included: true },
            ],
        },
        {
            title: 'Supervisor',
            subtitle: 'Control operativo y gestión del equipo',
            icon: <FaUserShield />,
            color: 'text-indigo-600',
            darkColor: 'text-indigo-400',
            bgColor: 'bg-indigo-100',
            darkBgColor: 'bg-indigo-900/30',
            highlighted: user?.role === 'Supervisor',
            permissions: [
                { permission: 'Todos los permisos de Vendedor', included: true },
                { permission: 'Consultar ventas del día', included: true },
                { permission: 'Consultar ventas por período', included: true },
                { permission: 'Ver detalle de ventas específicas', included: true },
                { permission: 'Registrar producto nuevo', included: true },
                { permission: 'Modificar información de productos', included: true },
                { permission: 'Eliminar producto (baja lógica)', included: true },
                { permission: 'Registrar compras a proveedores', included: true },
                { permission: 'Consultar compras realizadas', included: true },
                { permission: 'Registrar proveedores', included: true },
                { permission: 'Modificar información de proveedores', included: true },
                { permission: 'Crear categorías de productos', included: true },
                { permission: 'Modificar categorías', included: true },
                { permission: 'Generar reportes de ventas', included: true },
                { permission: 'Generar reportes de inventario', included: true },
                { permission: 'Consultar estadísticas del negocio', included: true },
                { permission: 'Gestionar usuarios del sistema', included: false },
                { permission: 'Configurar parámetros del sistema', included: false },
                { permission: 'Respaldar base de datos', included: false },
            ],
        },
    ]

    return (
        <div className="py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className={`
                        text-4xl font-bold mb-4 transition-colors
                        ${isDark ? 'text-gray-100' : 'text-gray-900'}
                    `}>
                        Roles de Usuario
                    </h1>
                    <p className={`
                        text-lg transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                        Conoce los diferentes niveles de acceso y permisos en PuntoCom
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {rolesData.map((role, index) => (
                        <RoleCard key={index} {...role} />
                    ))}
                </div>

                <div className={`
                    rounded-2xl p-6 transition-colors
                    ${isDark
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-gray-50 border border-gray-200'
                    }
                    `}>
                    <h3 className={`
                        text-lg font-semibold mb-3 transition-colors
                        ${isDark ? 'text-gray-200' : 'text-gray-900'}
                    `}>
                        Información importante sobre roles
                    </h3>
                    <ul className={`
                        space-y-2 text-sm transition-colors
                        ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                        <li className="flex items-start gap-2">
                            <span className="font-semibold">•</span>
                            <span>Los roles son asignados por el <strong>Administrador</strong> al momento de crear un usuario en el sistema.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-semibold">•</span>
                            <span>Los permisos son <strong>acumulativos</strong>: cada nivel superior incluye todos los permisos del nivel anterior.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-semibold">•</span>
                            <span>El rol de <strong>Administrador</strong> tiene control total del sistema, incluyendo gestión de usuarios y configuración.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-semibold">•</span>
                            <span>Para solicitar cambios en tu rol actual, contacta al administrador del sistema.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}