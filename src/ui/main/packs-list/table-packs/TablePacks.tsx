import React, { ChangeEvent, useEffect, useState } from 'react'

import { Box, FormControl, InputLabel, Select, Typography } from '@material-ui/core'
import { Pagination, Stack } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import s from './TablePacks.module.css'

import { getPacksTC } from 'bll/reducers/packsReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const TablePacks = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const currentPage = useAppSelector(state => state.packs.page)

  const [numberPage, setNumberPage] = useState(1)
  const [countPacks, setCountPacks] = useState(10)

  useEffect(() => {
    dispatch(getPacksTC(numberPage, countPacks))
  }, [countPacks])

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setCountPacks(e.target.value as number)
  }

  const onChangeNumberPage = (event: React.ChangeEvent<unknown>, num: number) => {
    setNumberPage(num)
  }

  return (
    <div className={s.tablePacksContainer}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardPacks.map(d => (
              <TableRow key={d._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {d.name}
                </TableCell>
                <TableCell align="right">{d.cardsCount}</TableCell>
                <TableCell align="right">{d.created}</TableCell>
                <TableCell align="right">{d.user_name}</TableCell>
                <TableCell align="right">actions</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Pagination
            page={countPacks}
            count={totalCount}
            boundaryCount={1}
            onChange={onChangeNumberPage}
          />
          <Typography>Show: {currentPage}</Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              {/*<InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
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
        </Stack>
      </div>
    </div>
  )
}
