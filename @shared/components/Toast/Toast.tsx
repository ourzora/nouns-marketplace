import Portal from '@reach/portal'
import { MotionBox } from '@shared'
import { Box, BoxProps, Paragraph } from '@zoralabs/zord'
import { AnimatePresence } from 'framer-motion'

import * as styles from './Toast.css'

interface ToastProps extends BoxProps {
  visible: boolean
}

export function Toast({ visible, children }: ToastProps) {
  return (
    <Portal>
      <AnimatePresence>
        {visible && (
          // <MotionBox
          <Box
            // key="toast"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            className={styles.toast}
            pos="fixed"
            bottom="x5"
            py="x2"
            px="x4"
            borderRadius="round"
          >
            <Paragraph color="reverse" size="sm">
              {children}
            </Paragraph>
          </Box>
          // </MotionBox>
        )}
      </AnimatePresence>
    </Portal>
  )
}
