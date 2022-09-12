import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from './appReducer'

import { sendUserInfoAC } from 'bll/reducers/profileReducer'
import { authApi } from 'dal/api/authApi'
import { LoginParamsType, RegisterType, UpdateUserType } from 'dal/api/Types/apiDataTypes'
import { UpdateUserResponseType, UserType } from 'dal/api/Types/apiResponseTypes'

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

export const logoutTC = createAsyncThunk('logout', async (param, { dispatch }) => {
  dispatch(setAppStatus({ status: 'succeeded' }))
  await authApi.logout()

  dispatch(sendUserInfoAC({} as UserType))
  dispatch(setIsLoggedInAC({ isLoggedIn: false }))
  dispatch(setAppStatus({ status: 'succeeded' }))
})

export const updateUserTC = createAsyncThunk(
  'updateUser',
  async (data: UpdateUserType, { dispatch }) => {
    let res = await authApi.updateUser(data)

    dispatch(updateName(res.data))
  }
)

export const meTC = createAsyncThunk('me', async () => {
  await authApi.me()
})

//Reducer
const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    updatedUser: {
      avatar: '',
      created: '',
      email: '',
      isAdmin: false,
      name: '',
      publicCardPacksCount: 0,
      rememberMe: false,
      token: '',
      tokenDeathTime: 0,
      updated: '',
      verified: false,
      __v: 0,
      _id: '',
    },
    token: '',
    tokenDeathTime: 0,
  },
  reducers: {
    setIsLoggedInAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    updateName: (state, action: PayloadAction<UpdateUserResponseType>) => {
      console.log('action payload: ', action.payload)
      state.updatedUser = action.payload.updatedUser
    },
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedInAC, updateName } = slice.actions
