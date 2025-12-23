import type React from "react"

export interface RolePermission {
  permission: string
  included: boolean
}

export interface RoleCardData {
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  darkColor: string
  bgColor: string
  darkBgColor: string
  permissions: RolePermission[]
  highlighted?: boolean
}