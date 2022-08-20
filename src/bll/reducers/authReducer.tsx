import { AppThunk } from '../../dal/store/store'

let initialState: InitialStateType = {}

export const authReducer = (
  state: InitialStateType = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
  }

  return state
}

//thunk
export const ThunkCreator = (): AppThunk => async (dispatch) => {
  try {
    //await
  } catch (e) {}
}

//type
type InitialStateType = {}
