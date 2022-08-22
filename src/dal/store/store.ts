import { combineReducers } from 'redux'
import { authReducer } from 'bll/reducers/authReducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

//type
type AppActionsType = Parameters<typeof rootReducer>[1]
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActionsType
>

// @ts-ignore
window.store = store
