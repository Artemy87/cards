import React from 'react'

import { setDeletePack } from 'bll/reducers/modalsReducer'
import { deletePackTC } from 'bll/reducers/packsReducer'
import { modal } from 'common/enum/modal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { CustomModal } from 'ui/modals/CustomModal'
import style from 'ui/modals/CustomModal.module.css'

type DeletePackModalType = {
  packName: string
  packId: string
}

export const DeletePackModal: React.FC<DeletePackModalType> = ({ packName, packId }) => {
  const dispatch = useAppDispatch()

  const deletePack = () => {
    dispatch(deletePackTC(packId))
  }

  return (
    <CustomModal modalName={modal.DELETE_PACK}>
      <div>Do you really want to remove Pack {packName}? All cards will be deleted.</div>
      <div className={style.buttons}>
        <button className={style.buttonDelete} onClick={deletePack} color={'primary'}>
          Delete
        </button>
      </div>
    </CustomModal>
  )
}
