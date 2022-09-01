import React from 'react'

import { TextField } from '@material-ui/core'

import styles from './Search.module.css'

export const Search = () => {
  return (
    <div>
      {' '}
      <TextField id="outlined-basic" label="Search" variant="outlined" />{' '}
    </div>
  )
}
