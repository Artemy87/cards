import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { Search } from 'ui/main/packs-list/search/Search'
import { TablePacks } from 'ui/main/packs-list/table-packs/TablePacks'

export const PacksList = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <div>
        <div>Packs List</div>
        <button>Add new pack</button>
      </div>
      <Search />
      <TablePacks />
    </div>
  )
}
