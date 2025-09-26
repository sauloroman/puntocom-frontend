import { useLocation } from "react-router-dom"

export const usePageName = () => {

    const location = 'PuntoCom'
    const { pathname } = useLocation()
    
    const getPage = (): [string, string] => {
        const [ , page ] = pathname.split('/')
        
        switch(page) {
            case '':
                return ['Dashboard', location + ' - ' + 'Dashboard']
            case 'warehouse':
                return ['Control de Almacén', location + ' - ' + 'Almacén']
            case 'sales':
                return ['Registro de Ventas', location + ' - ' + 'Ventas']
            case 'purchases':
                return ['Registro de Compras', location + ' - ' + 'Compras']
            case 'access':
                return ['Control de Acceso', location + ' - ' + 'Acceso']
            case 'reports':
                return ['Reportes generados', location + ' - ' + 'Reportes']
            case 'settings':
                return ['Ajustes del sistema', location + ' - ' + 'Ajustes']
            default: 
                return ['', '']
        }

    }

    return {
        getPage
    }

}