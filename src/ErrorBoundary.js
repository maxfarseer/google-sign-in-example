import React from 'react'
import * as Sentry from '@sentry/browser'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    Sentry.captureException(error, {
      extra: {
        message: `componentDidCatch - Failed to render at TOP level`,
        errorInfo: info,
      },
    })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так, попробуйте перезагрузить страницу</h1>
    }

    return this.props.children
  }
}

export { ErrorBoundary }
