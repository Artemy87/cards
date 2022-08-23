import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { authAPI, LoginParamsType, RegisterType } from 'dal/api/auth-api'

//THUNKS
export const createUser = createAsyncThunk(
  'register/createUser',
  async (data: RegisterType, { dispatch }) => {
    await authAPI.register({ ...data, email: data.email.toLowerCase() })
  }
)

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

export const loginTC = createAsyncThunk(
  'login/user',
  async (data: LoginParamsType, { dispatch }) => {
    await authAPI.login(data)
  }
)

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions
