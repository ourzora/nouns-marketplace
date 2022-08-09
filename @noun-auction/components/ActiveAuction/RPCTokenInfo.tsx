import { Stack, Flex, Heading, Label, Box, Button, BoxProps } from '@zoralabs/zord'
import { useNFT } from '@zoralabs/nft-hooks'
import NextLink from 'next/link'
import { returnDao } from 'constants/collection-addresses'
import { NounishThumbnail } from '../DataRenderers/NounishThumbnail'
import { tokenInfoWrapper } from '@noun-auction/styles/NounishStyles.css'

// @shared (or zord)
import { lightFont } from '@shared'

export interface RPCTokenInfoProps extends BoxProps {
  contractAddress: string | undefined
  tokenId: string | undefined
}

export function RPCTokenInfo({ contractAddress, tokenId, ...props }: RPCTokenInfoProps) {
  if (!tokenId || !contractAddress) return null

  const dao = returnDao(contractAddress)
  const { data } = useNFT(contractAddress, tokenId)

  return (
    <Flex className={['nounish-auction__token-info', tokenInfoWrapper]} {...props}>
      <NextLink href={`/collections/${contractAddress}/${tokenId}`} passHref>
        <Button as="a" variant="unset">
          <NounishThumbnail
            image={data?.media?.image?.uri}
            tokenContract={contractAddress}
            tokenId={tokenId}
          />
        </Button>
      </NextLink>
      <Stack justify="space-between">
        <Heading size="sm" as="h3">
          {data?.metadata?.name ? data?.metadata?.name : `${dao?.name} ${tokenId}`}
        </Heading>
        <Box mb="x1">
          <NextLink href={`/collections/${contractAddress}`} passHref>
            <Label as="a" color="tertiary" className={[lightFont]}>
              {dao?.name}
            </Label>
          </NextLink>
        </Box>
      </Stack>
    </Flex>
  )
}
