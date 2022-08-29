import React from 'react'

// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client'

import './index.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import reportWebVitals from './reportWebVitals'
import App from './ui/components/App'

import { store } from 'dal/store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()