import React from 'react'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

import s from './BackToPackListButton.module.css'

export const BackToPackListButton = () => {
  const navigate = useNavigate()

  return (
    <div className={s.backToPacksList} onClick={() => navigate('/packs')}>
      <div className={s.arrow}>
        <KeyboardBackspaceIcon fontSize={'medium'} />
      </div>
      <div className={s.text}>Back to Packs List</div>
    </div>
  )
}
