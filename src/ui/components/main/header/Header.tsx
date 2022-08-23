import React from 'react'
import { Link } from 'react-router-dom'
import s from './Header.module.css'
import { AppBar, Button, Toolbar } from '@mui/material'
import incubatorLogo from './img/Group 753.svg'

export const Header = () => {
  return (
    <div>
      <AppBar position="static" color="default" className={s.headerBlock}>
        <Toolbar className={s.toolBar}>
          <img src={incubatorLogo} alt="" />
          <button className={s.button}>Sing in</button>
        </Toolbar>
      </AppBar>
      <h1>Header</h1>
      <div className={s.linkGroup}>
        <Link to="/profile">profile</Link>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
        <Link to="/password-recovery">password recovery</Link>
        <Link to="/password">password</Link>
        <Link to="/test">test</Link>
      </div>
    </div>
  )
}
