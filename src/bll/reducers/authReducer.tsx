import { Dispatch } from 'redux'
import { authAPI } from '../../dal/api/auth-api'

let initialState = {
  isLoggedIn: false,
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

//thunks
export const loginTC = (data: any) => (dispatch: Dispatch) => {
  authAPI
    .login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
      } else {
        console.log('error')
      }
    })
    .catch(error => {
      console.log(error)
    })
}

//type
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedInAC>
