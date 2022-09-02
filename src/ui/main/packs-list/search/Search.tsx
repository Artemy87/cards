import React, { ChangeEvent, useEffect, useState } from 'react'

import { TextField } from '@material-ui/core'
import { useSearchParams } from 'react-router-dom'

import { getPacksTC } from '../../../../bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../../common/hooks/useDebounce'

type PropsType = {
  search: 'packName'
}

export const Search: React.FC<PropsType> = ({ search }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState<string>(searchParams.get(search) || '')
  const debouncedValue = useDebounce<string>(value)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const urlParams: { packName?: string } = {}

    if (debouncedValue) {
      urlParams[search] = debouncedValue
    } else searchParams.delete(search)

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...urlParams,
    })
    dispatch(getPacksTC(urlParams))
  }, [debouncedValue, search, searchParams, setSearchParams])

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      onChange={onChangeHandler}
    />
  )
}
