import { Eyebrow, Flex, FlexProps } from '@zoralabs/zord'
import React from 'react'

/**
 * A wrapper for ExchangeValue to display a title on the same row above
 */

interface ExchangeValueLabelProps extends FlexProps {
  label?: string
}

export function ExchangeValueLabel({
  children,
  label = 'NFT price',
  ...props
}: ExchangeValueLabelProps) {
  return (
    <Flex justify="space-between" align="center" py="x2" px="x4" {...props}>
      <Eyebrow color="text2" textTransform="uppercase">
        {label}
      </Eyebrow>
      {children}
    </Flex>
  )
}
