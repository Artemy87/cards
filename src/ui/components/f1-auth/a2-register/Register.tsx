import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import Paper from '@mui/material/Paper/Paper'
import { NavLink } from 'react-router-dom'
import style from './Register.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

const Register = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: (contacts) => {
      const errors: FormikErrorType = {}
      const minLengthPassword = 8

      if (!contacts.email) {
        errors.email = 'Укажите e-mail'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contacts.email)) {
        errors.email = 'Некорректный E-mail адрес'
      }

      if (!contacts.password) {
        errors.password = 'Некорректный пороль'
      } else if (contacts.password.length < minLengthPassword) {
        errors.password = 'Некорректный пороль'
      }

      if (!contacts.confirmPassword) {
        errors.confirmPassword = 'Некорректный пороль'
      } else if (contacts.confirmPassword.length < minLengthPassword) {
        errors.confirmPassword = 'Некорректный пороль'
      }

      return errors
    },
    onSubmit: (contacts) => {
      //dispatch(preparationFormTC(contacts, cards))
    },
  })
  return (
    <Paper elevation={3} className={style.paper}>
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <input placeholder="Email" {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
        <input placeholder="Password" {...formik.getFieldProps('password')} />
        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
        <input placeholder="Confirm password" {...formik.getFieldProps('confirmPassword')} />
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

export default Register
