import React from 'react'

import { Paper } from '@material-ui/core'
import { Navigate } from 'react-router-dom'

import { BackToPackListButton } from '../../../common/BackToPackListButton/BackToPackListButton'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { ButtonLogout } from 'ui/common/button-logout/ButtonLogout'
import style from 'ui/main/auth/auth.module.css'
import avatar from 'ui/main/auth/Profile/images/Ellipse 45.png'
import addAvatar from 'ui/main/auth/Profile/images/Group 61.png'
import pencil from 'ui/main/auth/Profile/images/Pencil.svg'
import s from 'ui/main/auth/Profile/Profile.module.css'

export const Profile = () => {
  const user = useAppSelector(state => state.userInfo.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className={s.profileContainer}>
      <BackToPackListButton />
      <Paper elevation={3} className={style.paper}>
        <div className={s.header}>Personal Information</div>
        <div className={s.imageGroup}>
          <img src={avatar} alt={'avatar'} />
          <img src={addAvatar} alt={'addAvatar'} className={s.avatar} />
        </div>
        <div className={s.nameGroup}>
          <div className={s.name}>{user.name}</div>
          <div className={s.pencilImage}>
            <img src={pencil} alt="" />
          </div>
        </div>
        <div className={s.email}>{user.email}</div>
        <ButtonLogout />
      </Paper>
    </div>
  )
}
