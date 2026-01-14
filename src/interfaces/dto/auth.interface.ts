export interface ForgotPasswordRequest {
    email: string
}

export interface ForgotPasswordResponse {
    ok: boolean, 
    message: string
}

export interface ChangePasswordRequest {
    token: string,
    newPassword: string
}

export interface ChangePasswordResponse {
    ok: boolean,
    message: string
}