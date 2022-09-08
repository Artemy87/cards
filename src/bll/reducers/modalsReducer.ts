import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { UpdatePackDataType } from 'dal/api/Types/apiDataTypes'

//THUNK
export const updatePackModalTC = createAsyncThunk(
  'updatePack',
  async (params: { id: string; name: string }, { dispatch }) => {
    dispatch(setDataPack(params))
    dispatch(setEditPackModal(true))
  }
)
export const deletePackModalTC = createAsyncThunk(
  'deletePack',
  async (params: { id: string; name: string }, { dispatch }) => {
    dispatch(setDataPack(params))
    dispatch(setDeletePackModal(true))
  }
)

const slice = createSlice({
  name: 'modals',
  initialState: {
    id: '',
    name: '',
    addPackModal: false,
    editPackModal: false,
    deletePackModal: false,
  },
  reducers: {
    setAddPackModal(state, action) {
      state.addPackModal = action.payload
    },
    setEditPackModal(state, action) {
      state.editPackModal = action.payload
    },
    setDeletePackModal(state, action) {
      state.deletePackModal = action.payload
    },
    setDataPack(state, action) {
      state.id = action.payload.id
      state.name = action.payload.name
    },
  },
})

export const modalsReducer = slice.reducer
export const { setAddPackModal, setEditPackModal, setDeletePackModal, setDataPack } = slice.actions
