import React from 'react'
import './App.css'
import { Header } from './main/header/Header'

import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './f1-auth/a1-login/Login'
import Register from './f1-auth/a2-register/Register'
import Profile from './f1-auth/a3-Profile/Profile'
import { Error404 } from './f1-auth/a4-404/Error404'
import PasswordRecovery from './f1-auth/a5-password-recovery/PasswordRecovery'
import Password from './f1-auth/a6-password/Password'

function App() {
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

export default App
