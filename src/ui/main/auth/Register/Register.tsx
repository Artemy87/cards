import React from 'react'

import FormGroup from '@mui/material/FormGroup'
import Paper from '@mui/material/Paper/Paper'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { createUser, setIsLoggedInAC } from 'bll/reducers/authReducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { RegisterType } from 'dal/api/Types/apiDataTypes'
import style from 'ui/main/auth/auth.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}
export const minLengthPassword = 8

export const Register = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: data => {
      const errors: FormikErrorType = {}

      if (!data.email) {
        errors.email = 'Укажите e-mail'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Некорректный E-mail адрес'
      }

      if (!data.password) {
        errors.password = 'Введите пароль'
      } else if (data.password.length < minLengthPassword) {
        errors.password = `Пароль должен содержать не менее ${minLengthPassword} символов`
      }

      if (!data.confirmPassword) {
        errors.confirmPassword = 'Введите пароль'
      } else if (data.confirmPassword.length < minLengthPassword) {
        errors.confirmPassword = `Пароль должен содержать не менее ${minLengthPassword} символов`
      }
      if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Поля должны совпадать'
        errors.password = 'Поля должны совпадать'
      }

      return errors
    },
    onSubmit: ({ email, password }: RegisterType) => {
      dispatch(createUser({ email, password }))
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    },
  })

  if (isLoggedIn) return <Navigate to="/profile" />

  return (
    <Paper elevation={3} className={style.paper}>
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <FormGroup>
          <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}
          <TextField
            type="password"
            label="Password"
            margin="normal"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
          <TextField
            type="password"
            label="Confirm password"
            margin="normal"
            {...formik.getFieldProps('confirmPassword')}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
          )}
          <button className={style.button} type="submit">
            Sign Up
          </button>
        </FormGroup>
      </form>
      <p>Already have an account?</p>
      <NavLink to={'/login'}>Sign In</NavLink>
    </Paper>
  )
}
