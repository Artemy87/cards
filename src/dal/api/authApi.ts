import { LoginParamsType, RegisterType } from './apiDataTypes'
import { InfoResponseType, MeResponseType, RegisterResponseType } from './apiResponseTypes'
import { instance } from './instances'

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
}
