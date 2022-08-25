import React from 'react'

import { AppBar, Toolbar } from '@mui/material'

import s from './Header.module.css'
import incubatorLogo from './img/Group 753.svg'

import { HeaderMenu } from 'ui/components/main/header/HeaderMenu/HeaderMenu'

export const Header = () => {
  return (
    <div>
      <AppBar position="static" color="default" className={s.headerBlock}>
        <Toolbar className={s.toolBar}>
          <img src={incubatorLogo} alt="" />
          <div style={{ display: 'flex', flexDirection: 'row', padding: '5px' }}>
            <HeaderMenu />
            <button className={s.button}>Sing in</button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
