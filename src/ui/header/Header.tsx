import React from 'react'

import { AppBar, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { ButtonLogout } from 'ui/common/button-logout/ButtonLogout'
import s from 'ui/header/Header.module.css'
import { HeaderMenu } from 'ui/header/HeaderMenu/HeaderMenu'
import incubatorLogo from 'ui/header/Image/Group 753.svg'

export const Header = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <div>
      <AppBar position="static" color="default" className={s.headerBlock}>
        <Toolbar className={s.toolBar}>
          <img src={incubatorLogo} alt="" />
          <div style={{ display: 'flex', flexDirection: 'row', padding: '5px' }}>
            <HeaderMenu />
            {!isLoggedIn ? (
              <button className={s.button} onClick={() => navigate('/login')}>
                Sign In
              </button>
            ) : (
              <ButtonLogout />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
