import React from 'react'
import { Link } from 'react-router-dom'
import s from './Header.module.css'

export const Header = () => {
  return (
    <div className={s.headerGroup}>
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
