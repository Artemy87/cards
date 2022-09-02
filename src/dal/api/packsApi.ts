import { CreatePackDataType, GetPacksDataType, UpdatePackDataType } from './apiDataTypes'
import {
  CreatePackResponseType,
  DeletePackResponseType,
  GetPacksResponseType,
  UpdatePackResponseType,
} from './apiResponseTypes'
import { instance } from './instances'

export const packsAPI = {
  getPacks(data: GetPacksDataType) {
    return instance.get<GetPacksResponseType>(`cards/pack`)
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
