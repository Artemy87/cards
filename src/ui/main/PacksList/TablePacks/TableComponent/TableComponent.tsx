import React from 'react'

import { TableCell } from '@material-ui/core'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

import teacher from '../Images/teacher.svg'

import s from './/TableComponent.module.css'

import { useAppSelector } from 'common/hooks/useAppSelector'

export const TableComponent = () => {
  const cardPacks = useAppSelector(state => state.packs.cardPacks)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={s.tableHeadContainer}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPacks.map(d => {
            const convertedDate = dayjs(d.created).format('D MMM YYYY')

            return (
              <TableRow
                className={s.tableRowContent}
                key={d._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={s.tableBodyName} component="th" scope="row">
                  {d.name}
                </TableCell>
                <TableCell align="right">{d.cardsCount}</TableCell>
                <TableCell align="right">{convertedDate}</TableCell>
                <TableCell align="right" style={{ width: '140px' }}>
                  {d.user_name}
                </TableCell>
                <TableCell align="right">
                  <img src={teacher} alt="teacher icon" />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
