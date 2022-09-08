import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from './appReducer'

import { sendUserInfoAC } from 'bll/reducers/profileReducer'
import { authApi } from 'dal/api/authApi'
import { LoginParamsType, RegisterType } from 'dal/api/Types/apiDataTypes'
import { UserType } from 'dal/api/Types/apiResponseTypes'

//THUNKS
export const createUser = createAsyncThunk(
  'register/createUser',
  async (data: RegisterType, { dispatch }) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      await authApi.register({ ...data, email: data.email.toLowerCase() })
      dispatch(loginTC({ ...data, rememberMe: false }))
    } catch (error) {
      const err = error as string

      if (err.length) {
        dispatch(setAppError(err))
      }
    } finally {
      dispatch(setAppStatus({ status: 'succeeded' }))
    }
  }
)

export const loginTC = createAsyncThunk(
  'auth/login',
  async (data: LoginParamsType, { dispatch }) => {
    dispatch(setAppStatus({ status: 'loading' }))
    const res = await authApi.login(data)

    dispatch(sendUserInfoAC(res.data))
    dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  }
)

export const logoutTC = createAsyncThunk('auth/logout', async (param, { dispatch }) => {
  await authApi.logout()

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
