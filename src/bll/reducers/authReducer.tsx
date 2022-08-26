import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppError } from './appReducer'

import { authAPI, LoginParamsType, RegisterType } from 'dal/api/auth-api'

//THUNKS
export const createUser = createAsyncThunk(
  'register/createUser',
  async (data: RegisterType, { dispatch }) => {
    try {
      await authAPI.register({ ...data, email: data.email.toLowerCase() })
    } catch (error) {
      const err = error as string

      if (err.length) {
        dispatch(setAppError(err))
      }
    }
  }
)

export const loginTC = createAsyncThunk(
  'login/user',
  async (data: LoginParamsType, { dispatch }) => {
    await authAPI.login(data)
    dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  }
)

export const logoutTC = createAsyncThunk('logout/user', async ({}, { dispatch }) => {
  await authAPI.logout()
  dispatch(setIsLoggedInAC({ isLoggedIn: false }))
})

//Reducer
const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedInAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions
