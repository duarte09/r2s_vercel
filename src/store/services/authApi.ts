import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AuthPayload,
  AuthResponse,
  RefreshPayload,
  SignupPayload,
} from '../../interfaces/auth'

// Criando interface para a resposta da API de CNPJ
interface CnpjApiResponse {
  cnpj: string
  razao_social: string
  nome_fantasia: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['Auth', 'Users'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthPayload>({
      query: (data) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (data) => ({
        url: '/api/v1/auth/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth', 'Users'],
    }),
    refreshToken: builder.query<AuthResponse, RefreshPayload>({
      query: (data) => ({
        url: '/api/v1/auth/refresh',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Auth'],
    }),
    validateToken: builder.mutation<{ message: string }, { token: string }>({
      query: (data) => ({
        url: '/api/v1/auth/validate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    verifyToken: builder.query<{ message: string }, { token: string }>({
      query: (data) => ({
        url: '/api/v1/auth/validate',
        method: 'POST',
        headers: data.token
          ? {
              Authorization: `Bearer ${data.token}`,
            }
          : undefined,
      }),
      providesTags: ['Auth'],
    }),
    confirmAccount: builder.mutation<
      { message: string },
      { user_id: number; token: string }
    >({
      query: (data) => ({
        url: '/api/v1/auth/confirm-account',
        method: 'POST',
        body: {
          user_id: data.user_id,
          token: data.token,
        },
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/api/v1/users/reset-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    // Adicionando endpoint para consultar CNPJ na Brasil API
    checkCnpj: builder.query<CnpjApiResponse, string>({
      query: (cnpj) => ({
        url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
})

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshTokenQuery,
  useValidateTokenMutation,
  useVerifyTokenQuery,
  useConfirmAccountMutation,
  useResetPasswordMutation,
  useCheckCnpjQuery,
} = authApi
