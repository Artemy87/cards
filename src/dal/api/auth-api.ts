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
    return instance.get<ResponseType<MeResponseType>>(`auth/me`)
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>(`auth/login`)
  },
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

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean

  error?: string
}
