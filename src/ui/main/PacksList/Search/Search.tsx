import React, { ChangeEvent, useEffect, useState } from 'react'

import { TextField } from '@material-ui/core'

import { setQueryParams } from '../../../../bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../../common/hooks/useDebounce'

import s from './Search.module.css'

type PropsType = {
  search: 'packName'
}

export const Search: React.FC<PropsType> = ({ search }) => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value)
  const dispatch = useAppDispatch()
  const queryParams = useAppSelector(state => state.packs.queryParams)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    dispatch(setQueryParams({ ...queryParams, [search]: debouncedValue }))
  }, [debouncedValue])

  return (
    <TextField
      className={s.searchInput}
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      onChange={onChangeHandler}
    />
  )
}
