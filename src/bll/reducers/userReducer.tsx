import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { authAPI, MeResponseType } from 'dal/api/auth-api'

//THUNKS
export const getUserInfoTC = () => async (dispatch: Dispatch) => {
  try {
    let res = await authAPI.me()

    dispatch(getUserInfoAC(res.data))
  } catch (e) {
    console.log(e)
  }
}

//Reducer
const slice = createSlice({
  name: 'user',
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
    } as MeResponseType,
  },
  reducers: {
    getUserInfoAC(state, action: PayloadAction<MeResponseType>) {
      state.user = action.payload
    },
  },
})

export const userReducer = slice.reducer
export const { getUserInfoAC } = slice.actions

// export const getUserInfoTC = createAsyncThunk('profile/getUser', async ({}, { dispatch }) => {
//   let res = await authAPI.me()
//
//   dispatch(getUserInfoAC(res.data))
// })
