import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { cardsAPI } from 'dal/api/cardsApi'
import { GetCardsResponseType } from 'dal/api/Types/apiResponseTypes'

//THUNKS
export const getCardsTC = createAsyncThunk('getCards', async (data: any, { dispatch }) => {
  const res = await cardsAPI.getCards(data)

  dispatch(getCardsAC(res.data.cards))
})

const slice = createSlice({
  name: 'cards',
  initialState: <GetCardsResponseType>{
    cards: [
      {
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: '',
      },
    ],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
  },
  reducers: {
    getCardsAC(state, action) {
      state.cards = action.payload
    },
  },
})

export const cardsReducer = slice.reducer
const { getCardsAC } = slice.actions
