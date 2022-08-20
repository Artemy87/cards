import React from 'react'
import './App.css'
import { Header } from './header/Header'
import { TestingComponents } from '../../n2-features/f0-test/TestingComponents'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from '../../n2-features/f1-auth/a1-login/Login'
import Register from '../../n2-features/f1-auth/a2-register/Register'
import Profile from '../../n2-features/f1-auth/a3-Profile/Profile'
import { Error404 } from '../../n2-features/f1-auth/a4-404/Error404'
import PasswordRecovery from '../../n2-features/f1-auth/a5-password-recovery/PasswordRecovery'
import Password from '../../n2-features/f1-auth/a6-password/Password'

function App() {
  // useAppSelector(state => state)
  // useAppDispatch()

  //git
  //

  // signup регистрация
  // использовать git fetch, так как он не обновляет(не перезатриает) рабочее состояние локального репозитория наш код подтягивая данные с удаленной репы, в отличии от git pull

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={'/profile'} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="test" element={<TestingComponents />} />
        <Route path="register" element={<Register />} />
        <Route path="password-recovery" element={<PasswordRecovery />} />
        <Route path="password" element={<Password />} />
        <Route path={'404'} element={<Error404 />} />
        <Route path="*" element={<Navigate to={'/404'} />} />
      </Routes>
      <input type="text" />
      <input type="text" />
    </div>
  )
}

export default App
