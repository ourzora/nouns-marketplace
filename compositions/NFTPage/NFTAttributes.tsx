import { Grid, Heading, Label, Stack, Box, BoxProps, radii } from '@zoralabs/zord'
import {
  nftMarketWrapper,
  nftAttributesWrapper,
  nftAttribute,
  nftAttributes,
} from './NFTPage.css'
import { useNFTProvider } from '@shared/providers/NFTProvider'

import { lightFont } from '@shared'

export interface NFTAttributesProps extends BoxProps {}

export function NFTAttributes({ ...props }: NFTAttributesProps) {
  const { initialData: nft } = useNFTProvider()

  if (!nft || !nft?.metadata?.attributes) return null

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
