import { Hyperlink } from '@shared/components/DataTable/DataTableItem'
import { Button, ButtonProps, Icon, mixins, Paragraph } from '@zoralabs/zord'
import React from 'react'

import * as styles from './LearnMoreButton.css'

interface LearnMoreButtonProps extends ButtonProps, Hyperlink {}

export function LearnMoreButton(props: LearnMoreButtonProps) {
  return (
    <Button as="a" variant="unset" className={mixins({ hoverFadeOut: true })} {...props}>
      <Paragraph className={styles.textColor} size="sm" color="tertiary">
        Learn more about selling on Zora
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
