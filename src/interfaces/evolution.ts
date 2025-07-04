export interface ChatContact {
  name: string
  phoneNumber: string
  profilePicUrl?: string
}

export interface CreateNewInstancePayload {
  instanceName: string
}

export interface QrCodeResponse {
  pairingCode: string
  code: string
  base64: string
  count: number
}

export interface Message {
  id: number
  content: string
  time: string
  isMe: boolean
}
export interface SendTextMessagePayload {
  instanceName: string
  message: string
  number: string
}

export interface ConnectionStateResponse {
  state: 'open' | 'connecting' | 'closed' | string
}