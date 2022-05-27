import { AddressZero } from '@ethersproject/constants'
import { Text } from '@zoralabs/zord/elements'
import React, { useMemo } from 'react'
import { NETWORK_CHAIN_ID } from '../utils/network'
import { isAddressMatch } from '../utils/validators'

function uniswapLinkUrl(outputCurrency: string) {
  const baseUrl = `https://app.uniswap.org/#/swap`

  const outputCurrencyParam = isAddressMatch(AddressZero, outputCurrency)
    ? 'ETH'
    : outputCurrency

  const qs = new URLSearchParams({
    ...(outputCurrencyParam ? { outputCurrency: outputCurrencyParam } : {}),
    network: NETWORK_CHAIN_ID === 1 ? 'mainnet' : 'rinkeby',
  }).toString()

  return [baseUrl, qs].join('?')
}

interface UniswapLinkProps {
  outputCurrency: string
  children: JSX.Element
}

export function UniswapLink({ outputCurrency, children, ...props }: UniswapLinkProps) {
  const href = useMemo(() => uniswapLinkUrl(outputCurrency), [outputCurrency])

  return (
    <Text
      as="a"
      href={href}
      target="_blank"
      rel="noreferer"
      css={{ textDecoration: 'none' }}
      {...props}
    >
      <Text as="span" variant="link" mr="x1">
        {children}
      </Text>
      <sup>↗</sup>
    </Text>
  )
}
