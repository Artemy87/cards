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
import { DeletePackModal } from 'ui/modals/packModal/DeletePackModal'

export const TableComponent = () => {
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.userInfo.user._id)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={s.tableHeadContainer}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Cards</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Created by</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPacks.map(d => {
            const convertedDate = dayjs(d.created).format('D MMM YYYY')
            const userId = d.user_id

            return (
              <TableRow
                className={s.tableRowContent}
                key={d._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={s.tableBodyName} component="th" scope="row">
                  {d.name}
                </TableCell>
                <TableCell>{d.cardsCount}</TableCell>
                <TableCell>{convertedDate}</TableCell>
                <TableCell style={{ width: '140px' }}>{d.user_name}</TableCell>
                <TableCell>
                  <img src={teacher} alt="teacher icon" />
                  {myId === userId ? (
                    <div>
                      <DeletePackModal packName={d.name} packId={d._id} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
