import React from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { loginTC } from '../../../../bll/reducers/authReducer'
import { RootStateType } from '../../../../dal/store/store'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

const Login = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Пароль обязателен'
      } else if (values.password.length < 3) {
        errors.password = 'Пароль должен быть больше 3 символов'
      }

      return errors
    },
    onSubmit: values => {
      // @ts-ignore
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup>
            <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red' }}>{formik.errors.email} </div>
            )}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red' }}>{formik.errors.password} </div>
            )}
            <FormControlLabel
              label={'Remember me'}
              control={<Checkbox {...formik.getFieldProps('rememberMe ')} />}
            />
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  )
}

export default Login
