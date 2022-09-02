import * as React from 'react'
import { useEffect } from 'react'

import { Typography } from '@material-ui/core'
import { Pagination, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { getPacksTC } from '../../../../bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'

import s from './TablePacks.module.css'

export const TablePacks = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const currentPage = useAppSelector(state => state.packs.page)

  const [page, setPage] = React.useState(1)

  console.log('TablePacks: ', currentPage)

  useEffect(() => {
    dispatch(getPacksTC(undefined))
  }, [])

  const onChangeNumberPage = (event: React.ChangeEvent<unknown>, num: number) => {
    dispatch(getPacksTC(num))
    setPage(num)
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
            page={page}
            count={totalCount}
            boundaryCount={1}
            onChange={onChangeNumberPage}
          />
          {/*<div>Show 100000</div>*/}
          {/*<div>Cards per Page</div>*/}
          <Typography>Page: {currentPage}</Typography>
        </Stack>
      </div>
    </div>
  )
}
