import React from 'react'

import { Button } from '@material-ui/core'
import { AppBar, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { logoutTC } from 'bll/reducers/authReducer'
import { useAppSelector } from 'common/hooks/hook'
import { ButtonLogout } from 'ui/components/common/button-logout/ButtonLogout'
import logout from 'ui/components/common/button-logout/img/logout.svg'
import s from 'ui/components/header/Header.module.css'
import { HeaderMenu } from 'ui/components/header/HeaderMenu/HeaderMenu'
import incubatorLogo from 'ui/components/header/img/Group 753.svg'

export const Header = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const login = () => navigate('/login')

  return (
    <div>
      <AppBar position="static" color="default" className={s.headerBlock}>
        <Toolbar className={s.toolBar}>
          <img src={incubatorLogo} alt="" />
          <div style={{ display: 'flex', flexDirection: 'row', padding: '5px' }}>
            <HeaderMenu />
            {!isLoggedIn ? (
              <button className={s.button} onClick={login}>
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
