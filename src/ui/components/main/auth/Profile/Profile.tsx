import React from 'react'

import { Paper } from '@material-ui/core'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Navigate } from 'react-router-dom'

import avatar from './images/Ellipse 45.png'
import addAvatar from './images/Group 61.png'
import pencil from './images/Pencil.svg'
import s from './Profile.module.css'

import { useAppSelector } from 'common/hooks/hook'
import { ButtonLogout } from 'ui/components/common/button-logout/ButtonLogout'
import style from 'ui/components/main/auth/auth.module.css'

export const Profile = () => {
  const user = useAppSelector(state => state.userInfo.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className={s.profileContainer}>
      <div className={s.backToPacksList}>
        <div className={s.arrow}>
          <KeyboardBackspaceIcon fontSize={'medium'} />
        </div>
        <div className={s.text}>Back to packs List</div>
      </div>
      <Paper elevation={3} className={style.paper}>
        <div className={s.header}>Personal Information</div>
        <div className={s.imageGroup}>
          <img src={avatar} alt={'avatar'} />
          <img src={addAvatar} alt={'addAvatar'} className={s.addAvatar} />
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
