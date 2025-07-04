import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'
import {
  ChatContact,
  CreateNewInstancePayload,
  QrCodeResponse,
  SendTextMessagePayload,
  ConnectionStateResponse,
} from '../../interfaces/evolution'

export const evolutionApi = createApi({
  reducerPath: 'evolutionApi',
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
  tagTypes: ['Evolution'],
  endpoints: (builder) => ({

    // Criar nova instância
    createNewInstance: builder.mutation<void, CreateNewInstancePayload>({
      query: (data) => ({
        url: `/api/v1/instance`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer my-secret-api-token`,
        },
      }),
    }),

    // Obter QR Code para conexão
    getQrCodeForInstance: builder.query<QrCodeResponse, string>({
      query: (instanceName) => ({
        url: `/api/v1/instance/connect/${instanceName}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer my-secret-api-token`,
        },
      }),
    }),

    // Localiza contatos e chats do whatsapp
    getChatContacts: builder.mutation<{ chats: ChatContact[] }, string>({
      query: (instanceName) => ({
        url: `/api/v1/chat/findChats/${instanceName}`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer my-secret-api-token`,
        },
      }),
    }),

    // Envia mensagens de texto
    sendTextMessages: builder.mutation<void, SendTextMessagePayload>({
      query: ({ instanceName, message, number }) => ({
        url: `/api/v1/instance/${instanceName}/message/sendText`,
        method: 'POST',
        body: {
          message,
          number,
        },
        headers: {
          'Authorization': `Bearer my-secret-api-token`,
        },
      }),
    }),

    // Verificar estado de conexão do WhatsApp
    getConnectionState: builder.query<ConnectionStateResponse, string>({
      query: (instanceName) => ({
        url: `/api/v1/instance/connectionState/${instanceName}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer my-secret-api-token`,
        },
      }),
    }),

  }),
})

export const {
  useCreateNewInstanceMutation,
  useGetQrCodeForInstanceQuery,
  useGetChatContactsMutation,
  useSendTextMessagesMutation,
  useGetConnectionStateQuery,
} = evolutionApi
