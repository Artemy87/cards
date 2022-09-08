import React, { ChangeEvent, useEffect, useState } from 'react'

import { TextField } from '@material-ui/core'

import { setSearchParams } from '../../../../bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useDebounce } from '../../../../common/hooks/useDebounce'

type PropsType = {
  search: 'packName'
}

export const Search: React.FC<PropsType> = ({ search }) => {
  // const [value, setValue] = useState<string>('')
  // const debouncedValue = useDebounce<string>('')
  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchParams({ [search]: e.target.value }))
  }

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
