import { createSlice } from '@reduxjs/toolkit'

interface ChatRedux {
  error: string | null | undefined
  loading: boolean
  chatSelectedId?: string | null | undefined
}

const initialState: ChatRedux = {
  error: null,
  loading: false,
  chatSelectedId: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChatId: (state, action) => {
      state.chatSelectedId = action.payload
    },
  }
})

export const { setSelectedChatId } = chatSlice.actions
export default chatSlice.reducer
