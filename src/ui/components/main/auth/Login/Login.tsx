import React from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Paper from '@mui/material/Paper/Paper'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { minLengthPassword } from '../Register/Register'

import { loginTC } from 'bll/reducers/authReducer'
import { useAppDispatch, useAppSelector } from 'common/hooks/hook'
import style from 'ui/components/main/auth/auth.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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
      } else if (values.password.length < minLengthPassword) {
        errors.password = `Пароль должен быть больше ${minLengthPassword} символов`
      }

      return errors
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) return <Navigate to="/profile" />

  return (
    <Paper elevation={3} className={style.paper}>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
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
          <Link
            to="/password-recovery"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'end',
              margin: '16px 0',
            }}
          >
            Forgot Password?
          </Link>
          <button className={style.button} type={'submit'} color={'primary'}>
            Login
          </button>
        </FormGroup>
      </form>
      <p>Already have an account?</p>
      <Link to="/register">Sing Up</Link>
    </Paper>
  )
}
