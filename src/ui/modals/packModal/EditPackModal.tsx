import React from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import { setEditPackModal } from 'bll/reducers/modalsReducer'
import { updatePackTC } from 'bll/reducers/packsReducer'
import { modal } from 'common/enum/modal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import edit from 'ui/main/PacksList/TablePacks/Images/edit-2.svg'
import { CustomModal } from 'ui/modals/CustomModal'
import style from 'ui/modals/CustomModal.module.css'

type FormikErrorType = {
  namePack?: string
  privatePack?: boolean
}

export const EditPackModal = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const open = useAppSelector(state => state.modals.editPackModal)
  const packName = useAppSelector(state => state.modals.name)
  const packId = useAppSelector(state => state.modals.id)
  const closeEditPackModal = () => dispatch(setEditPackModal(false))
  const formik = useFormik({
    initialValues: {
      namePack: packName,
      privatePack: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.namePack) {
        errors.namePack = 'Required'
      } else if (values.namePack.length < 1) {
        errors.namePack = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(
        updatePackTC({
          data: {
            _id: packId,
            name: values.namePack,
            private: values.privatePack,
            deckCover: '',
          },
          getPacksData: { page, pageCount },
        })
      )
      closeEditPackModal()
    },
  })

  return (
    <>
      <CustomModal modalName={modal.EDIT_PACK} open={open} handleClose={closeEditPackModal}>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField
              label="Name pack"
              placeholder={packName}
              margin="normal"
              {...formik.getFieldProps('namePack')}
            />
            {formik.touched.namePack && formik.errors.namePack && (
              <div style={{ color: 'red' }}>{formik.errors.namePack} </div>
            )}
            <FormControlLabel
              label={'Private pack'}
              control={<Checkbox {...formik.getFieldProps('privatePack ')} />}
            />
            <div className={style.buttons}>
              <button className={style.buttonCancel}>Cancel</button>
              <button className={style.buttonSave} type={'submit'} color={'primary'}>
                Save
              </button>
            </div>
          </FormGroup>
        </form>
      </CustomModal>
    </>
  )
}
