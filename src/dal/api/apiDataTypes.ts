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
  //?
  sortPacks?: string
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
