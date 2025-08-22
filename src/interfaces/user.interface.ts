export interface UserRequest {
  email: string,
  password: string
}

export interface UserResponse {
  ok: boolean,
  message: string,
  user: User,
  token: string
}

export interface UserRenewAuth {
  ok: boolean,
  user: User,
  token: string
}

export interface User {
  id: string,
  name: string,
  lastname: string,
  email: string,
  role: string,
  image: string,
  isActive: boolean,
  isValidated: boolean
  createdAt: string,
  updatedAt: string
}

export type Roles = 'Administrador' | 'Supervisor' | 'Vendedor';
export const Roles = {
  ADMINISTRADOR: 'Administrador' as Roles,
  SUPERVISOR: 'Supervisor' as Roles,
  VENDEDOR: 'Vendedor' as Roles,
};

export type AuthStatus = 'authenticated' | 'unauthenticated';
export const AuthStatus = {
  AUTHENTICATED: 'authenticated' as AuthStatus,
  UNAUTHENTICATED: 'unauthenticated' as AuthStatus,
};
