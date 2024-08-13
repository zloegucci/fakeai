import {
  combineReducers,
  configureStore,
  createSerializableStateInvariantMiddleware,
  Tuple,
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appReducer from '@/src/store/appSlice'

const persistConfig = {
  key: 'appData',
  storage,
}
const isSerializable = () => true
const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
})

const reducers = combineReducers({
  app: appReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(serializableMiddleware),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export const useRootDispatch = useDispatch.withTypes<RootDispatch>()
