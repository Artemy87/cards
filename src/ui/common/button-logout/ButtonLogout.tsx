import Button from '@mui/material/Button'

import s from './ButtonLogout.module.css'

import { logoutTC } from 'bll/reducers/authReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import logout from 'ui/common/button-logout/img/logout.svg'

export const ButtonLogout = () => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <Button
      onClick={onClickHandler}
      className={s.buttonLogout}
      type={'submit'}
      variant={'text'}
      color={'primary'}
    >
      <img src={logout} alt="" />
      Log out
    </Button>
  )
}
