import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WhatsAppState {
  schemaName: string | null
  instanceId: string | null
  connected: boolean
  qrCodeData: string | null
  pairingCode?: string
  responsibleName: string | null
  phone: string | null
}

const initialState: WhatsAppState = {
  schemaName: null,
  instanceId: null,
  connected: false,
  qrCodeData: null,
  responsibleName: null,
  phone: null,
  pairingCode: undefined,
}

const whatsAppSlice = createSlice({
  name: 'whatsApp',
  initialState,
  reducers: {
    setWhatsAppConnection: (state, action: PayloadAction<WhatsAppState>) => {
      state.schemaName = action.payload.schemaName
      state.instanceId = action.payload.instanceId
      state.connected = action.payload.connected
      state.qrCodeData = action.payload.qrCodeData
      state.pairingCode = action.payload.pairingCode

      if (action.payload.responsibleName) {
        state.responsibleName = action.payload.responsibleName
      }
      if (action.payload.phone) {
        state.phone = action.payload.phone
      }
    },
    clearWhatsAppConnection: (state) => {
      state.schemaName = null
      state.instanceId = null
      state.connected = false
      state.qrCodeData = null
      state.responsibleName = null
      state.phone = null
      state.pairingCode = undefined
    },
  },
})

export const { setWhatsAppConnection, clearWhatsAppConnection } =
  whatsAppSlice.actions
export default whatsAppSlice.reducer
