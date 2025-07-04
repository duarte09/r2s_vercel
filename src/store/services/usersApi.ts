import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'
import {
  RegisterNewUserPasswordPayload,
  UpdateUserPasswordPayload,
  UpdateUserPayload,
  UsersCountResponse,
  UsersResponse,
} from '@/interfaces/users'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, api) => {
      const token = (api.getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUserCount: builder.query<UsersCountResponse, void>({
      query: () => ({
        url: '/api/v1/users/count',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    getUserById: builder.query<UsersResponse, number>({
      query: (id) => ({
        url: `/api/v1/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    getAllUsers: builder.query<UsersResponse[], void>({
      query: () => ({
        url: '/api/v1/users',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    getAllUsersByCompanyId: builder.query<UsersResponse[], number>({
      query: (companyId) => ({
        url: `/api/v1/users/company/${companyId}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    inviteUser: builder.mutation<{ message: string }, string>({
      query: (email) => ({
        url: `/api/v1/users/invite`,
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<
      UsersResponse,
      UpdateUserPayload & { token?: string }
    >({
      query: (data) => ({
        url: `/api/v1/users/${data.user_id}`,
        method: 'PATCH',
        body: {
          email: data.email,
          name: data.name,
          role: data.role,
          status: data.status,
        },
        headers: data.token
          ? {
              Authorization: `Bearer ${data.token}`,
            }
          : undefined,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUserPassword: builder.mutation<
      UsersResponse,
      UpdateUserPasswordPayload & { resetToken?: string }
    >({
      query: (data) => {
        const { resetToken, ...bodyData } = data

        return {
          url: `/api/v1/users/password`,
          method: 'PUT',
          body: {
            email: bodyData.email,
            password: bodyData.password,
            password_again: bodyData.password_again,
          },
          headers: resetToken
            ? {
                Authorization: `Bearer ${resetToken}`,
              }
            : undefined,
        }
      },
      invalidatesTags: ['Users'],
    }),
    registerNewUserPassword: builder.mutation<
      UsersResponse,
      RegisterNewUserPasswordPayload & { resetToken?: string }
    >({
      query: (data) => {
        const { resetToken, ...bodyData } = data

        return {
          url: `/api/v1/users/invite/create`,
          method: 'POST',
          body: {
            name: bodyData.name,
            password: bodyData.password,
            password_again: bodyData.password_again,
          },
          headers: resetToken
            ? {
                Authorization: `Bearer ${resetToken}`,
              }
            : undefined,
        }
      },
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<UsersResponse, number>({
      query: (id) => ({
        url: `/api/v1/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  /* Get Users */
  useGetUserCountQuery,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useGetAllUsersByCompanyIdQuery,
  /* Create Users */
  useRegisterNewUserPasswordMutation,
  useInviteUserMutation,
  /* Delete Users */
  useDeleteUserMutation,
  /* Update Users */
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} = usersApi
