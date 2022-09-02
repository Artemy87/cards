import { CreatePackDataType, GetPacksDataType, UpdatePackDataType } from './apiDataTypes'
import {
  CreatePackResponseType,
  DeletePackResponseType,
  GetPacksResponseType,
  UpdatePackResponseType,
} from './apiResponseTypes'
import { instance } from './instances'

export const packsAPI = {
  getPacks(data: GetPacksDataType, numberPage: number | undefined = 1) {
    return instance.get<GetPacksResponseType>(`cards/pack?pageCount=${8}&page=${numberPage}`, {
      data,
    })
  },
  createPack(data: CreatePackDataType) {
    return instance.post<CreatePackResponseType>(`cards/pack`, { cardsPack: data })
  },
  updatePack(data: UpdatePackDataType) {
    return instance.put<UpdatePackResponseType>(`cards/pack`, { cardsPack: data })
  },
  deletePack(id: string) {
    return instance.delete<DeletePackResponseType>(`cards/pack?id=${id}`)
  },
}
