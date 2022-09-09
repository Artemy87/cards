import React from 'react'

import IconButton from '@mui/material/IconButton/IconButton'

import { setQueryParams } from '../../../../bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'

import styles from './ClearSettings.module.css'

import clearIcon from 'assets/img/clear.svg'

export const ClearSettings: React.FC = () => {
  const dispatch = useAppDispatch()
  const queryParams = useAppSelector(state => state.packs.queryParams)
  const clearParams = () => {
    dispatch(setQueryParams({ ...queryParams, packName: '', user_id: '' }))
  }

  return (
    <IconButton onClick={clearParams} className={styles.clearButton}>
      <img src={clearIcon} alt="clear filters" />
    </IconButton>
  )
}
