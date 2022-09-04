import React, { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import style from './CustomModal.module.css'

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type CustomModalPropsType = {
  children: ReactNode
  modalName: string
}

export const CustomModal: React.FC<CustomModalPropsType> = ({ children, modalName }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <button className={style.button} style={{ width: '175px' }} onClick={handleOpen}>
        {modalName}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <div className={style.modalHeader}>
            <h1>{modalName}</h1>
            <button onClick={handleClose}>X</button>
          </div>
          <hr />
          {children}
          <div className={style.buttons}>
            <button className={style.buttonCancel} onClick={handleClose}>
              Cancel
            </button>
            <button className={style.buttonSave} type={'submit'}>
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
