import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer } from 'bll/reducers/appReducer'
import { authReducer } from 'bll/reducers/authReducer'
import { userReducer } from 'bll/reducers/userReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  userInfo: userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

//type
type AppActionsType = Parameters<typeof rootReducer>[1]
export type RootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  AppActionsType
>

// @ts-ignore
window.store = store
