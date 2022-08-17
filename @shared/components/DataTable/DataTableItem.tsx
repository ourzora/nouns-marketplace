import { CopyButton, AvatarImage } from '@shared'
import { Flex, FlexProps, Icon, mixins, Paragraph } from '@zoralabs/zord'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import * as styles from './DataTableItem.css'
import useToggle from '@shared/hooks/useToggle'

/**
 * Line item in a data table, handles links and copy to clipboard button
 */

export type Hyperlink = {
  href?: string
  target?: string
  rel?: string
  download?: string
}

export interface DataTableItemProps extends FlexProps {
  copyValue?: string
  url?: Hyperlink
  value?: string
  address?: string
}

export function DataTableItem({
  address,
  children,
  copyValue,
  url,
  value,
  ...props
}: DataTableItemProps) {
  const [showCopied, handleCopyStatus] = useToggle()

  return (
    <Flex justify="space-between" w="100%" {...props}>
      <Paragraph size="sm" inline color="tertiary">
        {children}
      </Paragraph>

      <Flex gap="x2" align="center">
        <AnimatePresence>
          {showCopied && (
            <motion.div
              key="copied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Paragraph size="xs" color="tertiary">
                Copied
              </Paragraph>
            </motion.div>
          )}
        </AnimatePresence>

        {!!address && <AvatarImage address={address} size="24" variant="hairlineLight" />}

        <Paragraph
          display="flex"
          className={(styles.center, !!url?.href && mixins({ hoverFadeOut: true }))}
          size="sm"
          as={url?.href ? 'a' : 'div'}
          inline
          style={{ alignItems: 'center' }}
          {...url}
        >
          {value}

          {url?.href && (
            <Icon
              display="inline"
              id="ArrowRightAngle"
              ml="x1"
              top="x0"
              color="tertiary"
            />
          )}
        </Paragraph>

        {!!copyValue && (
          <CopyButton value={copyValue} onStatusChange={handleCopyStatus} />
        )}
      </Flex>
    </Flex>
  )
}
