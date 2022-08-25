import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { authAPI, MeResponseType, UserType } from '../../dal/api/auth-api'

//Reducer
const slice = createSlice({
  name: 'user',
  initialState: {
    user: {
      _id: '',
      email: '',
      name: '',
      avatar: '',
      publicCardPacksCount: 0, // количество колод

      created: Date,
      updated: Date,
      isAdmin: false,
      verified: false, // подтвердил ли почту
      rememberMe: false,

      error: '',
    },
  },
  reducers: {
    getUserInfoAC(state, action: PayloadAction<{ user: MeResponseType }>) {
      state.user = action.payload.user
    },
  },
})

export const userReducer = slice.reducer
export const { getUserInfoAC } = slice.actions

//THUNKS
export const getUserInfoTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      dispatch(getUserInfoAC(res.data))
    })
    .catch(e => {
      console.log(e)
    })
}
