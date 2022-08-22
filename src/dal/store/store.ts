import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'

import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { authReducer } from 'bll/reducers/authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

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
