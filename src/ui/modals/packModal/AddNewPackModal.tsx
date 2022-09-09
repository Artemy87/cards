import React, { ReactNode, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import { setAddPackModal, setEditPackModal } from 'bll/reducers/modalsReducer'
import { createPackTC } from 'bll/reducers/packsReducer'
import { modal } from 'common/enum/modal'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { CustomModal } from 'ui/modals/CustomModal'
import style from 'ui/modals/CustomModal.module.css'

type FormikErrorType = {
  packName?: string
  packPrivate?: boolean
}

export const AddNewPackModal = () => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const open = useAppSelector(state => state.modals.addPackModal)
  const closeAddPackModal = () => dispatch(setAddPackModal(false))
  const formik = useFormik({
    initialValues: {
      packName: '',
      packPrivate: false,
      deckCover: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.packName) {
        errors.packName = 'Required'
      } else if (values.packName.length < 1) {
        errors.packName = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(
        createPackTC({
          data: {
            name: values.packName,
            private: values.packPrivate,
            deckCover: values.deckCover,
          },
          getPacksData: { page, pageCount },
        })
      )
      formik.resetForm()
      closeAddPackModal()
    },
  })

  return (
    <>
      <CustomModal modalName={modal.ADD_PACK} open={open} handleClose={closeAddPackModal}>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField label="Name pack" margin="normal" {...formik.getFieldProps('packName')} />
            {formik.touched.packName && formik.errors.packName && (
              <div style={{ color: 'red' }}>{formik.errors.packName} </div>
            )}
            <FormControlLabel
              label={'Private pack'}
              control={<Checkbox {...formik.getFieldProps('privatePack ')} />}
            />
            <div className={style.buttons}>
              <button className={style.buttonSave} type={'submit'}>
                Save
              </button>
            </div>
          </FormGroup>
        </form>
      </CustomModal>
    </>
  )
}
