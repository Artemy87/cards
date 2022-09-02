import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { GetPacksResponseType } from '../../dal/api/apiResponseTypes'
import { packsAPI } from '../../dal/api/packsApi'

//THUNKS
export const getPacksTC = createAsyncThunk(
  'packs/getPacks',
  async (numberPage: number | undefined, { dispatch }) => {
    const res = await packsAPI.getPacks({}, numberPage)

    dispatch(getPacksAC(res.data))
  }
)

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
    cardPacksTotalCount: undefined,
    maxCardsCount: null,
    minCardsCount: null,
    page: undefined,
    pageCount: null,
  },
  reducers: {
    getPacksAC(state, action) {
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.page = action.payload.page
    },
  },
})

export const packsReducer = slice.reducer
const { getPacksAC } = slice.actions
