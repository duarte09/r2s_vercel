import { useAppSelector } from '@/store'
import {
  useLoginMutation,
  useRefreshTokenQuery,
} from '@/store/services/authApi'
import { useCallback, useEffect, useState } from 'react'
import { useGetUserByIdQuery, usersApi } from '@/store/services/usersApi'
import { setCredentials, setRefreshToken } from '@/store/slices/authSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

export function useReauth() {
  const [login, { isLoading }] = useLoginMutation()
  const { user, refresh_token } = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isReauthModalOpen, setIsReauthModalOpen] = useState(false)

  const openReauthModal = useCallback(() => {
    setIsReauthModalOpen(true)
  }, [])

  const closeReauthModal = useCallback(() => {
    setIsReauthModalOpen(false)
  }, [])

  const resetServices = useCallback(() => {
    dispatch(usersApi.util.resetApiState())
  }, [dispatch])

  const { error, isSuccess } = useGetUserByIdQuery(Number(user?.company.id), {
    selectFromResult: ({
      data,
      isFetching,
      error,
      isSuccess,
      isUninitialized,
    }) => ({
      userById: data,
      isFetching: isFetching,
      error: error as FetchBaseQueryError,
      isSuccess: isSuccess,
      isUninitialized,
    }),
    skip: !user?.company.id,
  })

  const { validateRefreshToken } = useRefreshTokenQuery(
    { refresh_token: String(refresh_token) },
    {
      selectFromResult: ({ data, isSuccess }) => ({
        validateRefreshToken: data,
        isSuccess,
      }),
      skip: !error?.status,
    }
  )

  useEffect(() => {
    if (validateRefreshToken && !isSuccess) {
      dispatch(setRefreshToken(validateRefreshToken.access_token))
      resetServices()
    }
  }, [dispatch, isSuccess, resetServices, validateRefreshToken])

  const handleReauth = useCallback(
    async (password: string) => {
      if (!user?.email) {
        toast.error('Erro: Usuário não encontrado')
        throw new Error('Usuário não encontrado')
      }

      try {
        const result = await login({
          email: user.email,
          password,
        }).unwrap()

        dispatch(setCredentials(result))

        resetServices()

        toast.success('Reautenticação realizada com sucesso!')
        return result
      } catch (error) {
        toast.error('Erro na reautenticação')
        throw error
      }
    },
    [dispatch, login, resetServices, user?.email]
  )

  return {
    handleReauth,
    isLoading,
    isReauthModalOpen,
    openReauthModal,
    closeReauthModal,
  }
}
