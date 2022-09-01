import React, { useEffect } from 'react'

import 'ui/App.css'

import { Backdrop, CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { initializeApp } from 'bll/reducers/appReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { Header } from 'ui/header/Header'
import { Error404 } from 'ui/main/auth/404/Error404'
import { Login } from 'ui/main/auth/Login/Login'
import PasswordRecovery from 'ui/main/auth/Password-recovery/PasswordRecovery'
import Password from 'ui/main/auth/Password/Password'
import { Profile } from 'ui/main/auth/Profile/Profile'
import { Register } from 'ui/main/auth/Register/Register'
import { PacksList } from 'ui/main/packs-list/PacksList'

export function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const status = useAppSelector(state => state.app.status)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  useEffect(() => {
    if (status === 'loading') setOpen(true)
    else setOpen(false)
  }, [status])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          margin: '20% auto',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <Backdrop open={open} sx={{ color: '#fff', zIndex: 2 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
