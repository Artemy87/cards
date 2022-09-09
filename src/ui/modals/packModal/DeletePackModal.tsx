import React from 'react'

import { setAddPackModal, setDeletePackModal, setEditPackModal } from 'bll/reducers/modalsReducer'
import { deletePackTC } from 'bll/reducers/packsReducer'
import { modal } from 'common/enum/modal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import trash from 'ui/main/PacksList/TablePacks/Images/trash.svg'
import { CustomModal } from 'ui/modals/CustomModal'
import style from 'ui/modals/CustomModal.module.css'

export const DeletePackModal = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const open = useAppSelector(state => state.modals.deletePackModal)
  const packName = useAppSelector(state => state.modals.name)
  const packId = useAppSelector(state => state.modals.id)
  const closeDeletePackModal = () => dispatch(setDeletePackModal(false))
  const deletePack = () => {
    dispatch(
      deletePackTC({
        id: packId,
        getPacksData: { page, pageCount },
      })
    )
    closeDeletePackModal()
  }

  return (
    <>
      <CustomModal modalName={modal.DELETE_PACK} open={open} handleClose={closeDeletePackModal}>
        <div>Do you really want to remove Pack {packName}? All cards will be deleted.</div>
        <div className={style.buttons}>
          <button className={style.buttonDelete} onClick={deletePack} color={'primary'}>
            Delete
          </button>
        </div>
      </CustomModal>
    </>
  )
}
