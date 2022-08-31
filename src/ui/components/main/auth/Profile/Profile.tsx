import React from 'react'

import { Button, Paper } from '@material-ui/core'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Navigate } from 'react-router-dom'

import avatar from './images/Ellipse 45.png'
import addAvatar from './images/Group 61.png'
import logout from './images/logout.svg'
import pencil from './images/Pencil.svg'
import s from './Profile.module.css'

import { logoutTC } from 'bll/reducers/authReducer'
import { useAppDispatch, useAppSelector } from 'common/hooks/hook'
import style from 'ui/components/main/auth/auth.module.css'

export const Profile = () => {
  const dispatch = useAppDispatch()
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
        <Button
          onClick={() => dispatch(logoutTC())}
          style={{
            color: 'black',
            border: '1px solid grey',
            borderRadius: '20px',
            width: '126px',
            margin: '0 auto',
          }}
          type={'submit'}
          variant={'text'}
          color={'primary'}
        >
          <img src={logout} alt="" />
          Log out
        </Button>
      </Paper>
    </div>
  )
}
