import React, { useEffect } from 'react'

import { Button, Paper } from '@material-ui/core'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Navigate } from 'react-router-dom'

import LogOutImage from './buttonImages/LogOutImage'
import PencilImage from './buttonImages/PencilImage'
import avatar from './images/Ellipse 45.png'
import addAvatar from './images/Group 61.png'
import s from './Profile.module.css'

import { logoutTC } from 'bll/reducers/authReducer'
import { getUserInfoTC } from 'bll/reducers/userReducer'
import { useAppDispatch, useAppSelector } from 'common/hooks/hook'

const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userInfo.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    dispatch(getUserInfoTC())
  }, [])

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
      <Paper elevation={3} className={s.personalInformationContainer}>
        <div className={s.header}>Personal Information</div>
        <div className={s.imageGroup}>
          <img src={avatar} alt={'avatar'} />
          <img src={addAvatar} alt={'addAvatar'} className={s.addAvatar} />
        </div>
        <div className={s.nameGroup}>
          <div className={s.name}>{user.name}</div>
          {/*<TextField id="standard-basic" label="Standard" variant="standard" />*/}
          <div className={s.pencilImage}>
            <PencilImage />
          </div>
        </div>
        <div className={s.email}>{user.email}</div>
        <Button
          style={{
            color: 'black',
            border: '1px solid grey',
            borderRadius: '20px',
            width: '126px',
          }}
          type={'submit'}
          variant={'text'}
          color={'primary'}
        >
          <LogOutImage />
          <div
            className={s.logOut}
            onClick={() => {
              dispatch(logoutTC())
            }}
          >
            Log out
          </div>
        </Button>
      </Paper>
    </div>
  )
}

export default Profile
