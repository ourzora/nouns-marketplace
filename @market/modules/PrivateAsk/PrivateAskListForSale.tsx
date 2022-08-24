import React from 'react'
import {
  Button,
  Eyebrow,
  Flex,
  Icon,
  Label,
  Paragraph,
  Stack,
  Tag,
  Well,
} from '@zoralabs/zord'
// import { MotionStack } from '@shared'

import * as styles from './PrivateAskFlow.css'
import { LearnMoreButton } from './LearnMoreButton'
import { CommonPrivateAskComponentProps } from './PrivateAskModal'

interface PrivateAskListForSaleProps extends CommonPrivateAskComponentProps {}

export function PrivateAskListForSale({ onNext, ...props }: PrivateAskListForSaleProps) {
  return (
    // <MotionStack
    <Stack
      gap="x5"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ duration: 0.2 }}
      {...props}
    >
      <Stack gap="x2">
        <Eyebrow>Sale type</Eyebrow>

        <Button className={styles.button} variant="unset" align="center" onClick={onNext}>
          <Well display="grid" className={styles.grid}>
            <Stack gap="x1">
              <Flex gap="x2" justify="flex-start" align="flex-start">
                <Label align="left">Create a Private Ask</Label>
                <Tag className={styles.offsetY}>New</Tag>
              </Flex>
              <Paragraph className={styles.textColor} size="sm" align="left">
                Sell to a specific buyer. It&apos;s like an escrow contract but much
                better
              </Paragraph>
            </Stack>

            <Flex w="x13" justify="flex-end" align="center">
              <Icon id="ChevronRight" color="tertiary" size="md" />
            </Flex>
          </Well>
        </Button>
      </Stack>

      <LearnMoreButton
        href="https://support.zora.co/en/articles/5878598-what-s-an-approval"
        target="_blank"
      />
      {/* </MotionStack> */}
    </Stack>
  )
}
