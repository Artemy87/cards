import Button from '@mui/material/Button'

import logout from './img/logout.svg'

import { logoutTC } from 'bll/reducers/authReducer'
import { useAppDispatch } from 'common/hooks/hook'

export const ButtonLogout = () => {
  const dispatch = useAppDispatch()

  return (
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
  )
}
