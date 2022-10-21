import { lightFont } from 'styles/styles.css'

import React from 'react'

import { AvatarImage, CopyButton } from '@shared'
import { useToggle } from '@shared/hooks/useToggle'
import { Flex, FlexProps, Icon, Paragraph, mixins } from '@zoralabs/zord'

import * as styles from './DataTableItem.css'

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
  label: string
  copyValue?: string
  url?: Hyperlink
  value?: string
  address?: string
  variant?: keyof typeof styles.rowVariants['variant']
  size?: 'lg' | 'sm'
}

export function DataTableItem({
  address,
  children,
  variant,
  copyValue,
  url,
  size = 'sm',
  value,
  ...props
}: DataTableItemProps) {
  const [showCopied, handleCopyStatus] = useToggle()

  return (
    <Flex justify="space-between" w="100%" {...props} className={styles.row({ variant })}>
      <Paragraph size={size} inline color="text2" className={[lightFont]}>
        {children}
      </Paragraph>

      <Flex gap="x2" align="center">
        {showCopied && (
          <Paragraph size="xs" color="text3">
            Copied
          </Paragraph>
        )}

        {!!address && <AvatarImage address={address} size="24" variant="hairlineLight" />}

        <Paragraph
          display="flex"
          className={(styles.center, !!url?.href && mixins({ hoverFadeOut: true }))}
          size={size}
          as={url?.href ? 'a' : 'div'}
          inline
          {...url}
        >
          {value}

          {url?.href && (
            <Icon display="inline" id="ArrowRightAngle" ml="x1" top="x0" color="text3" />
          )}
        </Paragraph>

        {!!copyValue && (
          <CopyButton value={copyValue} onStatusChange={handleCopyStatus} />
        )}
      </Flex>
    </Flex>
  )
}
