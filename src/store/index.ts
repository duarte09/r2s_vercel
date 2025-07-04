import { configureStore, createSelector } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authApi } from './services/authApi'
import { usersApi } from './services/usersApi'
import { evolutionApi } from './services/evolutionApi'
import authReducer from './slices/authSlice'
import whatsAppReducer from './slices/whatsappSlice'
import chatReducer from './slices/chatSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user', 'refresh_token'],
}

const whatsAppPersistConfig = {
  key: 'whatsApp',
  storage,
  whitelist: [
    'schemaName',
    'instanceId',
    'connected',
    'qrCodeData',
    'responsibleName',
    'phone',
    'pairingCode',
  ],
}

const chatPersistConfig = {
  key: 'chat',
  storage,
  whitelist: ['chatSelectedId'],
}

const campaignPersistConfig = {
  key: 'campaign',
  storage,
  whitelist: ['campaignSelectedId'],
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedWhatsAppReducer = persistReducer(whatsAppPersistConfig, whatsAppReducer)
const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    whatsApp: persistedWhatsAppReducer,
    chat: persistedChatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [evolutionApi.reducerPath]: evolutionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
        ],
      },
    }).concat(
      authApi.middleware,
      usersApi.middleware,
      evolutionApi.middleware
    ),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Hook tipado para dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
// Hook tipado para selector
export const useAppSelect: TypedUseSelectorHook<RootState> = useSelector

// (Opcional) Hook memoizado para selector
export function useAppSelector<T>(selector: (state: RootState) => T) {
  const memoizedSelector = createSelector((state: RootState) => state, selector)
  return useAppSelect(memoizedSelector)
}
