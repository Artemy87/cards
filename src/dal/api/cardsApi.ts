import { CreateCardDataType, GetCardsDataType, UpdateCardDataType } from './apiDataTypes'
import {
  CreateCardResponseType,
  DeleteCardResponseType,
  GetCardsResponseType,
  UpdateCardResponseType,
} from './apiResponseTypes'
import { instance } from './instances'

export const cardsAPI = {
  getCards(data: GetCardsDataType) {
    return instance.get<GetCardsResponseType>('cards/card', { data })
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
