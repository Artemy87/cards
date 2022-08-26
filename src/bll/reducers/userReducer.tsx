import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { setIsLoggedInAC } from 'bll/reducers/authReducer'
import { authAPI, MeResponseType } from 'dal/api/auth-api'

//THUNKS
export const getUserInfoTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      dispatch(getUserInfoAC(res.data))
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    })
    .catch(e => {
      console.log(e)
    })
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
