import React from 'react'

import { Icon, IconProps } from './Icon'

export interface SpinnerProps extends IconProps {}

export function Spinner({ ...props }: SpinnerProps) {
  return <Icon id="Spinner" {...props} />
}
