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

import { BackToPackListButton } from '../../../../common/BackToPackListButton/BackToPackListButton'
import { DeletePackModal } from '../../../../modals/packModal/DeletePackModal'
import { EditPackModal } from '../../../../modals/packModal/EditPackModal'
import edit from '../Images/edit-2.svg'
import trash from '../Images/trash.svg'

import s from './TablePack.module.css'

import { deletePackModalTC, updatePackModalTC } from 'bll/reducers/modalsReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const TablePack = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.userInfo.user._id)
  const editPackModalOpen = useAppSelector(state => state.modals.editPackModal)
  const deletePackModal = useAppSelector(state => state.modals.deletePackModal)

  const navigate = useNavigate()

  const studyCardsHandler = (cardsPack_id: string, packName: string) => {
    navigate(`/training-cards/${cardsPack_id}/${packName}`)
  }

  const onClickPackNameHandler = (packId: string) => {
    navigate(`/packs/:${packId}`)
  }

  return (
    <div>
      <BackToPackListButton />
      <h1>Pack</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={s.tableHeadContainer}>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Answer</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                  <TableCell
                    className={s.tableBodyName}
                    component="th"
                    scope="row"
                    onClick={() => onClickPackNameHandler(d._id)}
                  >
                    {d.name}
                  </TableCell>
                  <TableCell align="right">{d.cardsCount}</TableCell>
                  <TableCell align="right">{convertedDate}</TableCell>
                  <TableCell align="right" style={{ width: '140px' }}>
                    {d.user_name}
                  </TableCell>
                  <TableCell align="center">
                    <div>actions</div>
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
    </div>
  )
}
