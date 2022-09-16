import React, { useEffect } from 'react'

import { TableCell } from '@material-ui/core'
import { Rating } from '@mui/material'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'

import { getCardsTC } from '../../../../../bll/reducers/cardsReducer'
import { BackToPackListButton } from '../../../../common/BackToPackListButton/BackToPackListButton'
import { DeletePackModal } from '../../../../modals/packModal/DeletePackModal'
import { EditPackModal } from '../../../../modals/packModal/EditPackModal'
import { Search } from '../../Search/Search'
import { PaginationComponent } from '../../TablePagination/PaginationComponent'
import edit from '../Images/edit-2.svg'
import trash from '../Images/trash.svg'

import s from './TablePack.module.css'

import { deletePackModalTC, updatePackModalTC } from 'bll/reducers/modalsReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'

export const TablePack = () => {
  const dispatch = useAppDispatch()
  const { cardsPack_id, packName, user_id } = useParams()
  const navigate = useNavigate()

  const editPackModalOpen = useAppSelector(state => state.modals.editPackModal)
  const deletePackModal = useAppSelector(state => state.modals.deletePackModal)
  const cards = useAppSelector(state => state.cards.cards)
  const myId = useAppSelector(state => state.userInfo.user._id)

  // console.log('myId: ', myId, 'user_id: ', user_id)

  const studyCardsHandler = () => {
    navigate(`/training-cards/${cardsPack_id}/${packName}`)
  }

  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id, pageCount: 1000 }))
  }, [])

  return (
    <div className={s.tablePacksContainer}>
      <BackToPackListButton />
      {myId === user_id ? (
        <div className={s.headerContainer}>
          <div className={s.tableHeader}>My Pack</div>
          <Button sx={{ borderRadius: '20px', height: '36px' }} variant={'contained'}>
            add new card
          </Button>
        </div>
      ) : (
        <div className={s.headerContainer}>
          <div className={s.tableHeader}>Friend&rsquo;s Pack</div>
          <Button
            sx={{ borderRadius: '20px', height: '36px' }}
            variant={'contained'}
            onClick={studyCardsHandler}
          >
            learn to pack
          </Button>
        </div>
      )}
      <div className={s.searchContainer}>
        <div>Search</div>
        <Search search="packName" />
      </div>
      <TableContainer sx={{ marginTop: '24px' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: 'lightGray' }}>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Answer</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="center">Grade</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map(d => {
              const convertedDate = dayjs(d.created).format('D MMM YYYY')
              const userId = d.user_id
              const data = { id: d._id, name: d.question }

              return (
                <TableRow key={d._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell className={s.tableBodyName} component="th" scope="row">
                    {d.question}
                  </TableCell>
                  <TableCell align="right">{d.answer}</TableCell>
                  <TableCell align="right">{convertedDate}</TableCell>
                  <TableCell align="center">
                    <Rating name="read-only" value={d.grade} readOnly />
                  </TableCell>
                  <TableCell align="center">
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
      <PaginationComponent />
    </div>
  )
}
