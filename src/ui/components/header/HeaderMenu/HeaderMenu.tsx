import * as React from 'react'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'

import s from 'ui/components/header/HeaderMenu/HeaderMenu.module.css'

export function HeaderMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        className={s.burgerLinks}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/profile">profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/login">login</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/register">register</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/password-recovery">password recovery</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/password">password</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/test">test</Link>
        </MenuItem>
      </Menu>
    </div>
  )
}
