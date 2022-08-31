import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { rootReducer } from 'dal/store/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

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
