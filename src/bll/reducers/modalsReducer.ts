import { createSlice } from '@reduxjs/toolkit'

//THUNKS

const slice = createSlice({
  name: 'modals',
  initialState: {
    addPack: false,
    createPack: false,
    deletePack: false,
  },
  reducers: {
    setAddPack: (state, action) => {
      state.addPack = action.payload
    },
    setCreatePack: (state, action) => {
      state.createPack = action.payload
    },
    setDeletePack: (state, action) => {
      state.deletePack = action.payload
    },
  },
})

export const modalsReducer = slice.reducer
export const { setAddPack, setCreatePack, setDeletePack } = slice.actions
