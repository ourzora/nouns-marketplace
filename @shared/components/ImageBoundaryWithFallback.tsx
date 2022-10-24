import { ImageProps } from 'next/image'

import React, { Component } from 'react'

export interface ImageBoundaryWithFallbackProps extends ImageProps {
  src: string
  alt: string
}

export interface ImageBoundaryWithFallbackState {
  hasError: boolean
}

export class ImageBoundaryWithFallback extends Component<
  ImageBoundaryWithFallbackProps,
  ImageBoundaryWithFallbackState
> {
  constructor(props: ImageBoundaryWithFallbackProps) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    // @BJ/@Josh TODO: Add sentry reporting
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      const { children, ...fallbackProps } = this.props
      return <img {...fallbackProps} alt={fallbackProps.alt || ''} />
    }
    return this.props.children
  }
}
