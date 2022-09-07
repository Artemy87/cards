import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType } from 'bll/reducers/appReducer'

//THUNKS

const slice = createSlice({
  name: 'modals',
  initialState: { addPackModal: false },
  reducers: {
    setAddPackModal(state, action) {
      state.addPackModal = action.payload
    },
  },
})

export const modalsReducer = slice.reducer
export const { setAddPackModal } = slice.actions
