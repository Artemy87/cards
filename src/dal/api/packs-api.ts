import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const packsAPI = {
  getPacks() {
    // const page = `&page=${1}`
    // const pageCount = `&pageCount=${4}`
    return instance.get<PacksResponseType>(`cards/pack`)
  },
}

//types
export type PacksResponseType = {
  cardPacks: [
    {
      cardsCount: number | null
      created: string
      grade: number | null
      more_id: string
      name: string
      path: string
      private: boolean
      rating: number | null
      shots: number | null
      type: string
      updated: string
      user_id: string
      user_name: string
      __v: number | null
      _id: string
    }
  ]
  cardPacksTotalCount: number | null // количество колод
  maxCardsCount: number | null
  minCardsCount: number | null
  page: number | null // выбранная страница
  pageCount: number | null // количество элементов на странице
}
