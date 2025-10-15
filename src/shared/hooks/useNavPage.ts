import { useNavigate } from "react-router-dom";

export const useNavPage = () => {
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };

  const goToPage = (path: string) => {
    navigate(path);
  };

  const goToPageInNewTab = (path?: string) => {
    const baseUrl = window.location.origin;
    const targetUrl = path ? `${baseUrl}${path}` : window.location.href;

    window.open(targetUrl, "_blank");
  };

  return {
    onGoBack,
    goToPage,
    goToPageInNewTab, // nombre actualizado para claridad
  };
};
