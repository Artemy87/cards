import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { appReducer } from 'bll/reducers/appReducer'
import { authReducer } from 'bll/reducers/authReducer'
import { profileReducer } from 'bll/reducers/profileReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  userInfo: profileReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
