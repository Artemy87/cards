import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { cardsReducer } from '../reducers/cardsReducer'
import { gradeReducer } from '../reducers/gradeReducer'
import { packsReducer } from '../reducers/packsReducer'

import { appReducer } from 'bll/reducers/appReducer'
import { authReducer } from 'bll/reducers/authReducer'
import { modalsReducer } from 'bll/reducers/modalsReducer'
import { profileReducer } from 'bll/reducers/profileReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  userInfo: profileReducer,
  packs: packsReducer,
  modals: modalsReducer,
  cards: cardsReducer,
  grade: gradeReducer,
})

export const store = configureStore({
  reducer: rootReducer,
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
