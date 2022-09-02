import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { GetPacksResponseType } from '../../dal/api/apiResponseTypes'
import { packsAPI } from '../../dal/api/packsApi'

//THUNKS
export const getPacksTC = createAsyncThunk('packs/getPacks', async (data: any, { dispatch }) => {
  const res = await packsAPI.getPacks(data)

  dispatch(getPacksAC(res.data))
})

const slice = createSlice({
  name: 'packs',
  initialState: <GetPacksResponseType>{
    cardPacks: [
      {
        cardsCount: null,
        created: '',
        grade: null,
        more_id: '',
        name: '',
        path: '',
        private: false,
        rating: null,
        shots: null,
        type: '',
        updated: '',
        user_id: '',
        user_name: '',
        __v: null,
        _id: '',
      },
    ],
    cardPacksTotalCount: null,
    maxCardsCount: null,
    minCardsCount: null,
    page: null,
    pageCount: null,
  },
  reducers: {
    getPacksAC(state, action) {
      state.cardPacks = action.payload.cardPacks
    },
  },
})

export const packsReducer = slice.reducer
const { getPacksAC } = slice.actions
