import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppError } from './appReducer'

import { sendUserInfoAC } from 'bll/reducers/profileReducer'
import { authAPI, LoginParamsType, RegisterType, UserType } from 'dal/api/auth-api'

//THUNKS
export const createUser = createAsyncThunk(
  'register/createUser',
  async (data: RegisterType, { dispatch }) => {
    try {
      await authAPI.register({ ...data, email: data.email.toLowerCase() })
      dispatch(loginTC({ ...data, rememberMe: false }))
    } catch (error) {
      const err = error as string

      if (err.length) {
        dispatch(setAppError(err))
      }
    }
  }
)

export const loginTC = createAsyncThunk(
  'auth/login',
  async (data: LoginParamsType, { dispatch }) => {
    const res = await authAPI.login(data)

    dispatch(sendUserInfoAC(res.data))
    dispatch(setIsLoggedInAC({ isLoggedIn: true }))
  }
)

export const logoutTC = createAsyncThunk('auth/logout', async (param, { dispatch }) => {
  await authAPI.logout()

  dispatch(sendUserInfoAC({} as UserType))
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
