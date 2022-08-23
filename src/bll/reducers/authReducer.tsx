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
    setIsLoggedInAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

//thunks
export const loginTC = (data: any) => (dispatch) => {
  authAPI
    .login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: true}))
      } else {
        console.log('error')
      }
    })
    .catch(error => {
      console.log(error)
    })
}

export const loginTC = createAsyncThunk(
    'login/user',
    async (data: RegisterType, { dispatch }) => {
      await authAPI.login(data)
    }
)

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions


