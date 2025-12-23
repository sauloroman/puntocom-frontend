import type { MetaPagination } from "./pagination.interface"

export interface UserRequest {
  email: string,
  password: string
}

export interface GetUsersResponse {
  ok: boolean,
  meta: MetaPagination,
  users: User[]
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

export interface ChangeUserStatusResponse {
  ok: boolean,
  message: string,
  user: User
}

export interface UploadUserImage {
  ok: boolean,
  message: string,
  user: User
}

export interface CreateUser {
  name: string,
  lastname: string,
  email: string,
  password: string,
  role: Roles,
  phone: string,
}

export interface CreateUserResponse {
  ok: boolean,
  message: string,
  user: User,
}

export interface UpdateUser {
  name?: string,
  lastname?: string,
  role?: Roles
  phone?: string,
}

export interface UpdateUserResponse {
  ok: boolean,
  message: string,
  user: User
}

export interface User {
  id: string,
  name: string,
  lastname: string,
  email: string,
  role: string,
  image: string,
  phone: string,
  isActive: boolean,
  isValidated: boolean
  createdAt: string,
  updatedAt: string
}

export interface CheckAdminPassword {
  id: string,
  adminPassword: string
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
