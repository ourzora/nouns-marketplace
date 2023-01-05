import React from 'react'

import { Hyperlink } from '@shared/components/DataTable/DataTableItem'
import { Button, ButtonProps, Icon, Paragraph } from '@zord'
import { mixins } from '@zord/config'

import * as styles from './V3AskLearnMoreButton.css'

export interface V3AskLearnMoreButtonProps extends ButtonProps, Hyperlink {}

export function V3AskLearnMoreButton({
  children = 'Learn more about selling on Zora', // overrideable default text
  target = '_blank',
  href = 'https://support.zora.co/en/articles/5878598-what-s-an-approval',
  ...props
}: V3AskLearnMoreButtonProps) {
  return (
    <Button
      as="a"
      variant="unset"
      className={mixins({ hoverFadeOut: true })}
      target={target}
      href={href}
      {...props}
    >
      <Paragraph size="sm" color="text4">
        {children}
        <Icon
          className={styles.offsetY}
          display="inline-block"
          id="ArrowRightAngle"
          size="sm"
          ml="x2"
        />
      </Paragraph>
    </Button>
  )
}
