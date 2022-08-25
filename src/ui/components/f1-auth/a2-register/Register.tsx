import React from 'react'

import Paper from '@mui/material/Paper/Paper'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import style from './Register.module.css'

import { createUser, setIsLoggedInAC } from 'bll/reducers/authReducer'
import { useAppDispatch, useAppSelector } from 'common/hooks/hook'
import { RegisterType } from 'dal/api/auth-api'

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

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
      const minLengthPassword = 8

      if (!data.email) {
        errors.email = 'Укажите e-mail'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Некорректный E-mail адрес'
      }

      if (!data.password) {
        errors.password = 'Введите пароль'
      } else if (data.password.length < minLengthPassword) {
        errors.password = 'Пароль должен содержать не менее 8 символов'
      }

      if (!data.confirmPassword) {
        errors.confirmPassword = 'Введите пароль'
      } else if (data.confirmPassword.length < minLengthPassword) {
        errors.confirmPassword = 'Пароль должен содержать не менее 8 символов'
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
        <input placeholder="Email" {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
        <input type="password" placeholder="Password" {...formik.getFieldProps('password')} />
        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
        <input
          type="password"
          placeholder="Confirm password"
          {...formik.getFieldProps('confirmPassword')}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div>{formik.errors.confirmPassword}</div>
        )}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account?</p>
      <NavLink to={'/login'}>Sign In</NavLink>
    </Paper>
  )
}
