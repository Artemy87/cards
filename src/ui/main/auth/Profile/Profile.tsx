import React, { useState, KeyboardEvent } from 'react'

import { Paper, TextField } from '@material-ui/core'
import { Navigate } from 'react-router-dom'

import { BackToPackListButton } from '../../../common/BackToPackListButton/BackToPackListButton'

import { updateUserTC } from 'bll/reducers/authReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { ButtonLogout } from 'ui/common/button-logout/ButtonLogout'
import style from 'ui/main/auth/auth.module.css'
import avatar from 'ui/main/auth/Profile/images/Ellipse 45.png'
import addAvatar from 'ui/main/auth/Profile/images/Group 61.png'
import pencil from 'ui/main/auth/Profile/images/Pencil.svg'
import s from 'ui/main/auth/Profile/Profile.module.css'

export const Profile = () => {
  const dispatch = useAppDispatch()

  const [toggle, setToggle] = useState(false)
  const [newName, setNewName] = useState('')

  const user = useAppSelector(state => state.userInfo.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const name = useAppSelector(state => state.auth.updatedUser.name)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      updateName()
    }
  }

  const updateName = () => {
    if (newName.trim() !== '') {
      dispatch(updateUserTC({ name: newName }))
      setToggle(false)
    }
  }

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
          {!toggle && <div className={s.name}>{name}</div>}
          <div className={s.pencilImage}>
            {toggle ? (
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                value={newName}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={updateName}
                autoFocus
              />
            ) : (
              <img src={pencil} alt="" onClick={() => setToggle(true)} />
            )}
          </div>
        </div>
        <div className={s.email}>{user.email}</div>
        <ButtonLogout />
      </Paper>
    </div>
  )
}
