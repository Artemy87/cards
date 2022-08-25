import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>(
      `auth/login`,
      data
    )
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

export type InfoResponseType = {
  info: string
  error: string
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type MeResponseType = {
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

export type RegisterType = {
  email: string
  password: string
}

export type RegisterResponseType = {
  addedUser: UserType
  error?: string
}

export type UserType = {
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  rememberMe: boolean
  updated: string
  verified: boolean
  __v: number
  _id: string
}
