import React, { ChangeEvent, useEffect, useState } from 'react'

import { Box, FormControl, Select } from '@material-ui/core'
import { Pagination, Stack } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import s from './/PaginationComponent.module.css'

import { getPacksTC } from 'bll/reducers/packsReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const PaginationComponent = () => {
  const dispatch = useAppDispatch()

  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

  const [numberPage, setNumberPage] = useState(1)
  const [countPacks, setCountPacks] = useState(10)

  useEffect(() => {
    dispatch(getPacksTC({ page: numberPage, pageCount: countPacks }))
  }, [numberPage, countPacks])

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setCountPacks(e.target.value as number)
  }

  const onChangeNumberPage = (event: React.ChangeEvent<unknown>, num: number) => {
    setNumberPage(num)
  }

  return (
    <div className={s.paginationContainer}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Pagination
          page={numberPage}
          count={totalCount}
          boundaryCount={1}
          onChange={onChangeNumberPage}
        />
        <div className={s.show}>Show</div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countPacks}
              label={countPacks}
              onChange={handleChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className={s.cardsPerPage}>Cards per Page</div>
      </Stack>
    </div>
  )
}
