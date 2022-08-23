import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI, RegisterType } from 'dal/api/authAPI'

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
    changeLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer
export const { changeLoggedIn } = slice.actions
