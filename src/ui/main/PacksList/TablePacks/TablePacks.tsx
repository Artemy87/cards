import React, { FC } from 'react'

import { PaginationComponent } from './PaginationComponent/PaginationComponent'
import { TableComponent } from './TableComponent/TableComponent'
import s from './TablePacks.module.css'

export const TablePacks: FC = () => {
  return (
    <div className={s.tablePacksContainer}>
      <TableComponent />
      <PaginationComponent />
    </div>
  )
}
