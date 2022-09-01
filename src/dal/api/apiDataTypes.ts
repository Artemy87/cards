//auth
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterType = {
  email: string
  password: string
}

//cards
export type GetPacksDataType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: number
  page?: number
  pageCount?: number
  user_id?: string
}

export type CreatePackDataType = {
  name: string
  private: boolean
  deckCover: string
}

export type UpdatePackDataType = {
  _id: string
  name: string
  private: boolean
  deckCover: string
}

//cards
export type GetCardsDataType = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type CardDataType = {
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type CreateCardDataType = { cardsPack_id: string } & CardDataType
export type UpdateCardDataType = { _id: string } & CardDataType
