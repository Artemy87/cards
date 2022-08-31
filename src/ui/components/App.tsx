import React, { useEffect } from 'react'

import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from './main/auth/a1-login/Login'
import { Register } from './main/auth/a2-register/Register'
import { Profile } from './main/auth/a3-Profile/Profile'

import { initializeApp } from 'bll/reducers/appReducer'
import { useAppDispatch } from 'common/hooks/hook'
import { Header } from 'ui/components/header/Header'
import { Error404 } from 'ui/components/main/auth/a4-404/Error404'
import PasswordRecovery from 'ui/components/main/auth/a5-password-recovery/PasswordRecovery'
import Password from 'ui/components/main/auth/a6-password/Password'

export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={'/profile'} />} />
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
