import { Stack, StackProps } from '@zoralabs/zord'
import React from 'react'
import * as styles from './Toast.css'

export function ToastContainer({ children }: StackProps) {
  return (
    <Stack gap="x3" className={styles.container}>
      {children}
    </Stack>
  )
}
