import { AuthResponse } from '@/interfaces/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: Omit<AuthResponse, 'access_token' | 'refresh_token'> | null
  token: string | null
  refresh_token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  refresh_token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { access_token, refresh_token, ...userWithoutToken } =
        action.payload
      state.user = userWithoutToken
      if (access_token) {
        state.token = access_token
        state.refresh_token = refresh_token
        state.isAuthenticated = true
      }
    },

    setRefreshToken: (state, action: PayloadAction<string>) => {
   
        state.token = action.payload

    },

    clearCredentials: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },

})

export const { setCredentials, clearCredentials, setRefreshToken } = authSlice.actions

export default authSlice.reducer
