import React, { ReactNode, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import style from './CustomModal.module.css'

import { modal } from 'common/enum/modal'

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '2px',
  boxShadow: 24,
  p: 4,
}

type CustomModalPropsType = {
  children: ReactNode
  modalName: modal
}

export const CustomModal: React.FC<CustomModalPropsType> = ({ children, modalName }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <button className={style.button} style={{ width: '175px' }} onClick={handleOpen}>
        {modalName}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <div className={style.modalHeader}>
            <h1>{modalName}</h1>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <hr />
          {children}
          <button className={style.buttonCancel} onClick={handleClose}>
            Cancel
          </button>
        </Box>
      </Modal>
    </div>
  )
}
