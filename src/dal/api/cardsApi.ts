import { CreateCardDataType, GetCardsParamsType, UpdateCardDataType } from './apiDataTypes'
import {
  CreateCardResponseType,
  DeleteCardResponseType,
  GetCardsResponseType,
  UpdateCardResponseType,
} from './apiResponseTypes'
import { instance } from './instances'

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
