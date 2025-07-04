import { AuthResponse } from '@/interfaces/auth'
import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'


interface UserRedux {
  error: string | null | undefined
  loading: boolean
  userData: AuthResponse | null
  role: string
  authenticated: boolean
}

const initialState: UserRedux = {
  error: null,
  loading: false,
  userData: null,
  role: 'user',
  authenticated: false,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.role = action.payload
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload
    },
    setLogout: (state) => {
      state.userData = null
    },
    setNewSchemaName: (state, action) => {
      state.userData!.tenant.schema_name = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.loading = false
        state.userData = action.payload
      }
    )
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        state.loading = false
        state.userData = state.userData && {
          ...state.userData,
          access_token: action.payload.access_token,
          tenant: action.payload.tenant,
        }
      }
    )
    
  },
})

export const { setAdmin, setAuthenticated, setLogout, setNewSchemaName } =
  userSlice.actions
export default userSlice.reducer
