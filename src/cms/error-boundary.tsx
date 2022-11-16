import React, { PropsWithChildren, ReactNode } from 'react'

type State = { error: Error | null; errorInfo: React.ErrorInfo | null }

type Props = PropsWithChildren<{
  name: string
  renderError: (props: { error: Error; errorInfo: React.ErrorInfo }) => ReactNode
}>

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.warn('Failed to render', this.props.name)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.error) {
      return this.props.renderError({ error: this.state.error, errorInfo: this.state.errorInfo! })
    }

    return this.props.children
  }
}
