export const today = new Date().toISOString().split('T')[0]

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}
