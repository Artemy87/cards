import { instance } from './instances'

import {
  CreateCardDataType,
  GetCardsParamsType,
  UpdateCardDataType,
} from 'dal/api/Types/apiDataTypes'
import {
  CreateCardResponseType,
  DeleteCardResponseType,
  GetCardsResponseType,
  UpdateCardResponseType,
} from 'dal/api/Types/apiResponseTypes'

export const cardsAPI = {
  getCards(params: GetCardsParamsType) {
    return instance.get<GetCardsResponseType>('cards/card', { params })
  },
  createCard(data: CreateCardDataType) {
    return instance.post<CreateCardResponseType>(`cards/card`, { card: data })
  },
  updateCard(data: UpdateCardDataType) {
    return instance.put<UpdateCardResponseType>(`cards/card`, { card: data })
  },
  deleteCard(id: string) {
    return instance.delete<DeleteCardResponseType>(`cards/card?id=${id}`)
  },
}
