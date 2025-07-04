export interface AuthPayload {
  email: string
  password: string
}


export interface SignupPayload {
  cnpj: string
  email: string
  password: string
  company: string
  name: string
}

export interface RefreshPayload {
  refresh_token:string
}

export interface AuthResponse {
  id: number
  email: string
  role: string
  status: string
  access_token: string
  refresh_token: string
  company: Company
  tenant: Tenant
}

export interface Company {
  id: number
  company_map_id: number
  company_name: string
  cnpj: string
  phone: string
  sector: string
  created_at: string
  updated_at: string
}

export interface Tenant {
  id: number
  schema_name: string
  created_at: string
}
