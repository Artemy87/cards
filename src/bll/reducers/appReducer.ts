import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

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
