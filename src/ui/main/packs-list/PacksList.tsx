import React from 'react'

import { Navigate } from 'react-router-dom'

import style from './PacksList.module.css'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { Search } from 'ui/main/packs-list/search/Search'
import { TablePacks } from 'ui/main/packs-list/table-packs/TablePacks'

export const PacksList = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div className={style.packsList}>
      <div className={style.packsListHeader}>
        <div>Packs List</div>
        <button className={style.button}>Add new pack</button>
      </div>
      <Search />
      <TablePacks />
    </div>
  )
}
