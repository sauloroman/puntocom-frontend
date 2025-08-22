import axios from "axios";

export const handleError = (error: unknown) => {

    let errorMessage = "Ocurrió un error inesperado";
    
    if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
    }
    
    console.error("Login error:", error);
    return errorMessage
}
