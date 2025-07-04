export interface ClientsResponse {
  id: number
  company_map_id: number
  company_name: string
  cnpj: string
  phone: string
  sector: string
  created_at: string
  updated_at: string
  schema_name: string
}

export interface UpdateClientByCompanyIdPayload {
  sector: string
  phone: string
  id: number
}

export interface UpdateClientPhonePayload {
  phone: string
  id: number
}

export interface UpdateClientSectorPayload {
  sector: string
  id: number
}
