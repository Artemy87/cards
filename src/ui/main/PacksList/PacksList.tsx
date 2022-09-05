import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import style from './PacksList.module.css'

import { getPacksTC } from 'bll/reducers/packsReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { TablePacks } from 'ui/main/PacksList/TablePacks/TablePacks'
import { AddNewPackModal } from 'ui/modals/packModal/AddNewPackModal'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)

  useEffect(() => {
    dispatch(getPacksTC({ page, pageCount }))
  }, [page, pageCount])

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className={style.packsList}>
      <div className={style.packsListHeader}>
        <div>Packs List</div>
        <AddNewPackModal />
      </div>
      {/*<div className={style.navWrapper}>*/}
      {/*  <Search search="packName" />*/}
      {/*</div>*/}
      <TablePacks />
    </div>
  )
}
