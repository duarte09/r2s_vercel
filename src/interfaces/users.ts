export enum UserRole {
  ADMIN = 'admin',
  ADMIN_BIOFY = 'admin_biofy',
  USER = 'user',
}

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'DEACTIVATED',
  PENDING = 'PENDING',
}

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus]

export interface UsersResponse {
  id: number
  company_map_id: number
  name?: string
  email: string
  password: string
  role: UserRoleType
  status: UserStatusType
  easy_appointment_id?: number
  company: string
  created_at: string
  updated_at: string
}

export interface UsersCountResponse {
  quantidade: number
}

export interface UpdateUserPayload {
  email?: string
  user_id: number
  name?: string
  status?: UserStatusType
  role?: UserRoleType
}

export interface UpdateUserRolePayload {
  role: string
  user_id: number
}

export interface UpdateUserStatusPayload {
  status: string
  user_id: number
}

export interface UpdateUserEmailPayload {
  email: string
  user_id: number
}

export interface UpdateUserPasswordPayload {
  email: string
  password: string
  password_again: string
}

export interface RegisterNewUserPasswordPayload {
  name: string
  password: string
  password_again: string
}
