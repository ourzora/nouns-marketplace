import { useMemo } from 'react'

import { useNFTProvider } from '@shared/providers/NFTProvider'
import { BoxProps, Grid, Heading, Label, Paragraph, Stack } from '@zord'

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
              <Paragraph color="text3" textTransform="capitalize">
                {attribute.name}
              </Paragraph>
              <Label size="lg" textTransform="capitalize" textAlign="center">
                {attribute.value}
              </Label>
            </Stack>
          ))}
      </Grid>
    </Stack>
  )
}
