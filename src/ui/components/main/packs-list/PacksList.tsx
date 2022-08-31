import React from 'react'

import { Search } from './search/Search'
import { TablePacks } from './table-packs/TablePacks'

export const PacksList = () => {
  return (
    <div>
      <div>
        <div>Packs list</div>
        <button>Add new pack</button>
      </div>
      <Search />
      <TablePacks />
    </div>
  )
}
