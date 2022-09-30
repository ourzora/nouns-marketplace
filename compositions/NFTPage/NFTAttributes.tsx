import { Grid, Heading, Label, Stack, Box, BoxProps } from '@zoralabs/zord'
import {
  nftMarketWrapper,
  nftAttributesWrapper,
  nftAttribute,
  nftAttributes,
} from './NFTPage.css'
import { useNFTProvider } from '@shared/providers/NFTProvider'

import { lightFont } from '@shared'
import { useMemo } from 'react'

export interface NFTAttributesProps extends BoxProps {}

export function NFTAttributes({ ...props }: NFTAttributesProps) {
  const { initialData: nft } = useNFTProvider()
  const hasAttributes = useMemo(
    () => nft?.metadata?.attributes && nft?.metadata?.attributes.length > 0,
    [nft?.metadata?.attributes]
  )

  if (!nft || !hasAttributes) return null

  return (
    <Box className={nftAttributes} {...props}>
      <Stack className={nftMarketWrapper}>
        <Heading as="h3">Traits</Heading>
        <Grid className={nftAttributesWrapper}>
          {nft?.metadata?.attributes &&
            nft?.metadata?.attributes.map((attribute) => (
              <Stack key={attribute.name} className={nftAttribute}>
                <Label
                  size="lg"
                  className={lightFont}
                  color="tertiary"
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
    </Box>
  )
}
