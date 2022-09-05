import React from 'react'

import { deletePackTC } from 'bll/reducers/packsReducer'
import { modal } from 'common/enum/modal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { CustomModal } from 'ui/modals/CustomModal'
import style from 'ui/modals/CustomModal.module.css'

type DeletePackModalType = {
  packName: string
  packId: string
}

export const DeletePackModal: React.FC<DeletePackModalType> = ({ packName, packId }) => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)

  const deletePack = () => {
    dispatch(
      deletePackTC({
        id: packId,
        getPacksData: { page, pageCount },
      })
    )
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
