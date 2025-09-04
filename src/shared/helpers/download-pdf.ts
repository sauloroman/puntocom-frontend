export const downloadPdf =  async ( urlPdf: string, reportName: string ) => {
    const response = await fetch(urlPdf)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${reportName}.pdf`
    link.click()

    window.URL.revokeObjectURL(url)
}