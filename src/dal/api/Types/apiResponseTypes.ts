//auth
export type InfoResponseType = {
  info: string
  error: string
}

export type MeResponseType = UserType & { error?: string }

export type RegisterResponseType = {
  addedUser: UserType
  error?: string
}

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number

  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean

  error?: string
}

//packs
export type GetPacksResponseType = {
  cardPacks: Array<PackType>
  cardPacksTotalCount: number | undefined // количество колод
  maxCardsCount: number | null
  minCardsCount: number | null
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  searchParams: searchType
}

export type searchType = {
  packName?: string
}

export type PackType = {
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

export type CreatePackResponseType = {
  newCardsPack: PackType
}

export type UpdatePackResponseType = {
  updatedCardsPack: PackType
}

export type DeletePackResponseType = {
  deletedCardsPack: PackType
}

//cards
export type CardType = {
  answer: string
  answerImg: string
  answerVideo: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  questionImg: string
  questionVideo: string
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  __v: number
  _id: string
}

export type GetCardsResponseType = {
  cards: Array<CardType>
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packCreated: string
  packDeckCover: string
  packName: string
  packPrivate: boolean
  packUpdated: string
}

export type CreateCardResponseType = {
  newCard: CardType
}

export type UpdateCardResponseType = {
  updatedCard: CardType
}

export type DeleteCardResponseType = {
  deletedCard: CardType
}

export type UpdateGradeOfCardsResponseType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}
