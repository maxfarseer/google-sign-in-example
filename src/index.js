import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ErrorBoundary } from './ErrorBoundary'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { init } from '@sentry/browser'

init({
  dsn: 'https://c7215af2bee7423595ad05f423327f98@sentry.io/1317121',
})

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
