import React from 'react'

import { TableCell, Tooltip } from '@material-ui/core'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import edit from '../Images/edit-2.svg'
import teacher from '../Images/teacher.svg'
import trash from '../Images/trash.svg'

import s from './/TableComponent.module.css'

import { deletePackModalTC, updatePackModalTC } from 'bll/reducers/modalsReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { DeletePackModal } from 'ui/modals/packModal/DeletePackModal'
import { EditPackModal } from 'ui/modals/packModal/EditPackModal'

export const TableComponent = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.userInfo.user._id)
  const editPackModalOpen = useAppSelector(state => state.modals.editPackModal)
  const deletePackModal = useAppSelector(state => state.modals.deletePackModal)

  const navigate = useNavigate()

  const studyCardsHandler = (cardsPack_id: string, packName: string) => {
    navigate(`/training-cards/${cardsPack_id}/${packName}`)
  }

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
            const data = { id: d._id, name: d.name }

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
                  <div>
                    {d.cardsCount ? (
                      <img
                        src={teacher}
                        alt="teacher icon"
                        onClick={() => studyCardsHandler(d._id, d.name)}
                      />
                    ) : (
                      <Tooltip title="No cards">
                        <img src={teacher} alt="teacher icon" style={{ opacity: '0.43' }} />
                      </Tooltip>
                    )}
                  </div>
                  {myId === userId ? (
                    <div>
                      <div onClick={() => dispatch(updatePackModalTC(data))}>
                        <img src={edit} alt="edit icon" />
                      </div>
                      {editPackModalOpen && <EditPackModal />}
                      <div onClick={() => dispatch(deletePackModalTC(data))}>
                        <img src={trash} alt="trash icon" />
                      </div>
                      {deletePackModal && <DeletePackModal />}
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
