import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/' || 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  register(data: RegisterType) {
    return instance.post<RegisterResponseType>('auth/register', data)
  },
}
export type RegisterType = {
  email: string
  password: string
}
export type RegisterResponseType = {
  addedUser: {}
  error?: string
}
