import React, { useEffect } from 'react'

import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from './main/auth/Login/Login'
import { Profile } from './main/auth/Profile/Profile'
import { Register } from './main/auth/Register/Register'

import { initializeApp } from 'bll/reducers/appReducer'
import { useAppDispatch } from 'common/hooks/hook'
import { Header } from 'ui/components/header/Header'
import { Error404 } from 'ui/components/main/auth/404/Error404'
import PasswordRecovery from 'ui/components/main/auth/Password-recovery/PasswordRecovery'
import Password from 'ui/components/main/auth/Password/Password'
import { PacksList } from 'ui/components/main/packs-list/PacksList'

export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={'/packs'} />} />
        <Route path="packs" element={<PacksList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="password-recovery" element={<PasswordRecovery />} />
        <Route path="password" element={<Password />} />
        <Route path={'404'} element={<Error404 />} />
        <Route path="*" element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}
