import { instance } from './instances'

import {
  CreatePackDataType,
  GetPacksParamsType,
  UpdatePackDataType,
} from 'dal/api/Types/apiDataTypes'
import {
  CreatePackResponseType,
  DeletePackResponseType,
  GetPacksResponseType,
  UpdatePackResponseType,
} from 'dal/api/Types/apiResponseTypes'

export const packsAPI = {
  getPacks(params: GetPacksParamsType) {
    return instance.get<GetPacksResponseType>(`cards/pack`, { params })
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
