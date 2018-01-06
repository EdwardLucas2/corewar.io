import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      errorMessage: props.errorMessage
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    // this gets reported to rollbar
    throw new Error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>
    }
    return this.props.children
  }
}

ErrorBoundary.PropTypes = {
  errorMessage: PropTypes.string
}

export default ErrorBoundary