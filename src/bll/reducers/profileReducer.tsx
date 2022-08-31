import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from 'dal/api/auth-api'

//THUNKS

//Reducer
const slice = createSlice({
  name: 'profile',
  initialState: {
    user: {
      _id: '',
      email: '',
      name: '',
      avatar: '',
      publicCardPacksCount: 0,
      created: '',
      updated: '',
      isAdmin: false,
      verified: false,
      rememberMe: false,
      error: '',
    } as UserType,
  },
  reducers: {
    sendUserInfoAC(state, action: PayloadAction<UserType>) {
      state.user = action.payload
    },
  },
})

export const profileReducer = slice.reducer
export const { sendUserInfoAC } = slice.actions
