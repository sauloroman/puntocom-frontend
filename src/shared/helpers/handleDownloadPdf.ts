import { getEnvVariables } from "./";

export const handleDownloadPdf = (url: string) => {
  const { VITE_BACKEND_URL } = getEnvVariables()
  const fullUrl = `${VITE_BACKEND_URL}/${url}`;
  const link = document.createElement("a");
  link.href = fullUrl;
  link.download = "reporte-proveedores.pdf";
  link.click();
};