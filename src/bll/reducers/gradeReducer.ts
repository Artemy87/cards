import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { gradeAPI } from '../../dal/api/gradeApi'

import { setAppStatus } from './appReducer'

import { UpdateGradeOfCardsResponseType } from 'dal/api/Types/apiResponseTypes'

//THUNKS
export const updateGradeTC = createAsyncThunk(
  'updateGrade',
  async (params: { grade: number; card_id: string }, { dispatch }) => {
    dispatch(setAppStatus({ status: 'loading' }))

    const res = await gradeAPI.updateGrade(params)

    dispatch(updateGradeAC(res.data.updatedGrade))
    dispatch(setAppStatus({ status: 'succeeded' }))
  }
)

const slice = createSlice({
  name: 'grade',
  initialState: <UpdateGradeOfCardsResponseType>{
    updatedGrade: {
      _id: '',
      cardsPack_id: '',
      card_id: '',
      user_id: '',
      grade: 0,
      shots: 0,
    },
  },
  reducers: {
    updateGradeAC(state, action) {
      state = action.payload
    },
  },
})

export const gradeReducer = slice.reducer
const { updateGradeAC } = slice.actions
