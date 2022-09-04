import React from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import style from 'ui/main/auth/auth.module.css'
import { CustomModal } from 'ui/modals/CustomModal'

type FormikErrorType = {
  namePack?: string
  privatePack?: boolean
}

export const EditPackModal = () => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      namePack: '',
      privatePack: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.namePack) {
        errors.namePack = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.namePack)) {
        errors.namePack = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      // dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  return (
    <CustomModal modalName={'Edit pack'}>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <TextField label="Name pack" margin="normal" {...formik.getFieldProps('namePack')} />
          {formik.touched.namePack && formik.errors.namePack && (
            <div style={{ color: 'red' }}>{formik.errors.namePack} </div>
          )}
          <FormControlLabel
            label={'Private pack'}
            control={<Checkbox {...formik.getFieldProps('privatePack ')} />}
          />
          <button className={style.buttonCancel}>Cancel</button>
          <button className={style.button} type={'submit'} color={'primary'}>
            Save
          </button>
        </FormGroup>
      </form>
    </CustomModal>
  )
}
