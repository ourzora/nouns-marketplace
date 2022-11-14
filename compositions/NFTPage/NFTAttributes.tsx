import { useMemo } from 'react'

import { lightFont } from '@shared'
import { useNFTProvider } from '@shared/providers/NFTProvider'
import { Box, BoxProps, Grid, Heading, Label, Stack, radii } from '@zoralabs/zord'

import {
  nftAttribute,
  nftAttributes,
  nftAttributesWrapper,
  nftMarketWrapper,
} from './NFTPage.css'

export interface NFTAttributesProps extends BoxProps {}

export function NFTAttributes({ ...props }: NFTAttributesProps) {
  const { nft } = useNFTProvider()
  const hasAttributes = useMemo(
    () => nft?.metadata?.attributes && nft?.metadata?.attributes.length > 0,
    [nft?.metadata?.attributes]
  )

  if (!nft || !hasAttributes) return null

  return (
    <Stack className={['traits', nftAttributes, nftMarketWrapper]} {...props}>
      <Heading as="h3">Traits</Heading>
      <Grid className={nftAttributesWrapper}>
        {nft?.metadata?.attributes &&
          nft?.metadata?.attributes.map((attribute) => (
            <Stack key={attribute.name} className={nftAttribute}>
              <Label
                size="lg"
                className={lightFont}
                color="text3"
                textTransform="capitalize"
              >
                {attribute.name}
              </Label>
              <Label size="lg" textTransform="capitalize">
                {attribute.value}
              </Label>
            </Stack>
          ))}
      </Grid>
    </Stack>
  )
}
