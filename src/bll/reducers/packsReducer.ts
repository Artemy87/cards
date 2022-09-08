import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { packsAPI } from 'dal/api/packsApi'
import { CreatePackDataType } from 'dal/api/Types/apiDataTypes'
import { GetPacksResponseType } from 'dal/api/Types/apiResponseTypes'

//THUNKS
export const getPacksTC = createAsyncThunk('getPacks', async (data: any, { dispatch }) => {
  const res = await packsAPI.getPacks(data)

  console.log(data)
  dispatch(getPacksAC(res.data))
})

export const createPackTC = createAsyncThunk(
  'createPack',
  async (
    params: { data: CreatePackDataType; getPacksData: { page: number; pageCount: number } },
    { dispatch }
  ) => {
    await packsAPI.createPack(params.data)

    dispatch(getPacksTC(params.getPacksData))
  }
)

export const deletePackTC = createAsyncThunk(
  'deletePack',
  async (
    params: { id: string; getPacksData: { page: number; pageCount: number } },
    { dispatch }
  ) => {
    await packsAPI.deletePack(params.id)

    dispatch(getPacksTC(params.getPacksData))
  }
)

const slice = createSlice({
  name: 'packs',
  initialState: {
    cardPacks: [
      {
        cardsCount: 0,
        created: '',
        grade: 0,
        more_id: '',
        name: '',
        path: '',
        private: false,
        rating: 0,
        shots: 0,
        type: '',
        updated: '',
        user_id: '',
        user_name: '',
        __v: 0,
        _id: '',
      },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    searchParams: { packName: '' },
  } as GetPacksResponseType,
  reducers: {
    getPacksAC(state, action) {
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.page = action.payload.page
    },
    setPage(state, action) {
      state.page = action.payload
    },
    setPageCount(state, action) {
      state.pageCount = action.payload
    },
    setSearchParams(state, action) {
      state.searchParams = action.payload
    },
  },
})

export const packsReducer = slice.reducer
export const { getPacksAC, setPage, setPageCount, setSearchParams } = slice.actions
