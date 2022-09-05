import React, { ChangeEvent } from 'react'

import { Box, FormControl, Select } from '@material-ui/core'
import { Pagination, Stack } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import s from './/PaginationComponent.module.css'

import { getPacksAC, getPacksTC, setPage, setPageCount } from 'bll/reducers/packsReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const PaginationComponent = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)

  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

  const onChangeNumberPage = (event: React.ChangeEvent<unknown>, num: number) => {
    dispatch(setPage(num))
  }

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    dispatch(setPageCount(e.target.value as number))
  }

  return (
    <div className={s.paginationContainer}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Pagination
          page={page}
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
              value={pageCount}
              label={pageCount}
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
