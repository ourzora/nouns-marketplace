import React from 'react'

import { Stack, StackProps } from '@zoralabs/zord'

import * as styles from './Toast.css'

export function ToastContainer({ children }: StackProps) {
  return (
    <Stack gap="x3" className={styles.container}>
      {children}
    </Stack>
  )
}
