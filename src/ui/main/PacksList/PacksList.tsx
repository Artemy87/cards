import React, { useEffect } from 'react'

import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'

import { setAddPackModal } from '../../../bll/reducers/modalsReducer'

import { ClearSettings } from './ClearSettings/ClearSettings'
import { FilterPacks } from './FilterPacks/FilterPacks'
import style from './PacksList.module.css'
// eslint-disable-next-line import/namespace
import { Search } from './Search/Search'
import { TablePacks } from './TablePacks/TablePacks'
import { PaginationComponent } from './TablePagination/PaginationComponent'

import { getPacksTC } from 'bll/reducers/packsReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { AddNewPackModal } from 'ui/modals/packModal/AddNewPackModal'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const addPackModalOpen = useAppSelector(state => state.modals.addPackModal)
  const queryParams = useAppSelector(state => state.packs.queryParams)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  useEffect(() => {
    dispatch(getPacksTC(Object.assign({}, { page, pageCount }, queryParams)))
  }, [page, pageCount, queryParams])

  return (
    <div className={style.packsList}>
      <div className={style.packsListHeader}>
        <div>Packs List</div>
        <Button onClick={() => dispatch(setAddPackModal(true))}>add pack</Button>
        {addPackModalOpen && <AddNewPackModal />}
      </div>
      <div className={style.navWrapper}>
        <Search search="packName" />
        <FilterPacks />
        <ClearSettings />
      </div>
      <TablePacks />
      <PaginationComponent />
    </div>
  )
}
