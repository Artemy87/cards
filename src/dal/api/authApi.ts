import { instance } from './instances'

import { LoginParamsType, RegisterType } from 'dal/api/Types/apiDataTypes'
import {
  InfoResponseType,
  MeResponseType,
  RegisterResponseType,
  UpdateUserResponseType,
} from 'dal/api/Types/apiResponseTypes'

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<MeResponseType>(`auth/login`, data)
  },
  me() {
    return instance.post<MeResponseType>(`auth/me`)
  },
  logout() {
    return instance.delete<InfoResponseType>(`auth/me`)
  },
  register(data: RegisterType) {
    return instance.post<RegisterResponseType>('auth/register', data)
  },
  updateUser(data: any) {
    return instance.put<UpdateUserResponseType>('auth/me', data)
  },
}
