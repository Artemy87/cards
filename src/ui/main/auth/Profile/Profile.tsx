import React from 'react'

import { Paper } from '@material-ui/core'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { ButtonLogout } from 'ui/common/button-logout/ButtonLogout'
import style from 'ui/main/auth/auth.module.css'
import avatar from 'ui/main/auth/Profile/images/Ellipse 45.png'
import addAvatar from 'ui/main/auth/Profile/images/Group 61.png'
import pencil from 'ui/main/auth/Profile/images/Pencil.svg'
import s from 'ui/main/auth/Profile/Profile.module.css'

export const Profile = () => {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.userInfo.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className={s.profileContainer}>
      <div className={s.backToPacksList} onClick={() => navigate('/packs')}>
        <div className={s.arrow}>
          <KeyboardBackspaceIcon fontSize={'medium'} />
        </div>
        <div className={s.text}>Back to Packs List</div>
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
