import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setIsLoggedInAC } from 'bll/reducers/authReducer'
import { sendUserInfoAC } from 'bll/reducers/profileReducer'
import { authAPI } from 'dal/api/auth-api'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//THUNKS
export const initializeApp = createAsyncThunk('app/initializeApp', async (param, { dispatch }) => {
  try {
    const res = await authAPI.me()

    dispatch(sendUserInfoAC(res.data))
    dispatch(setIsLoggedInAC({ isLoggedIn: true }))

    return res.data
  } catch (error) {
    const err = error as string

    if (err.length) {
      dispatch(setAppError(err))
    }
  }
})

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
})

export const appReducer = slice.reducer
export const { setAppStatus, setAppError } = slice.actions
