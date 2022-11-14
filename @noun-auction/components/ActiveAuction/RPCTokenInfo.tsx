import { Button } from 'components/Button'
import { returnDao } from 'constants/collection-addresses'
import NextLink from 'next/link'

import * as styles from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { useNFT } from '@zoralabs/nft-hooks'
import { Box, BoxProps, Flex, Heading, Label, Stack } from '@zoralabs/zord'

import { NounishThumbnail } from '../DataRenderers/NounishThumbnail'

export interface RPCTokenInfoProps extends BoxProps {
  contractAddress: string | undefined
  tokenId: string | undefined
}

export function RPCTokenInfo({ contractAddress, tokenId, ...props }: RPCTokenInfoProps) {
  const dao = returnDao(contractAddress)
  const { data } = useNFT(contractAddress, tokenId)

  if (!tokenId || !contractAddress) return null

  return (
    <Flex className={['nounish-auction__token-info', styles.tokenInfoWrapper]} {...props}>
      <NextLink href={`/collections/${contractAddress}/${tokenId}`} passHref>
        <Button as="a" variant="unset" className={styles.thumbnailLink}>
          <NounishThumbnail
            image={data?.media?.image?.uri}
            tokenContract={contractAddress}
            tokenId={tokenId}
          />
        </Button>
      </NextLink>
      <Stack justify="space-between">
        <Heading size="sm" as="h3">
          {data?.metadata?.name ?? `${dao?.name} ${tokenId}`}
        </Heading>
        <Box mb="x1">
          <NextLink href={`/collections/${contractAddress}`} passHref>
            <Label as="a" color="text3" className={[lightFont]}>
              {dao?.name}
            </Label>
          </NextLink>
        </Box>
      </Stack>
    </Flex>
  )
}
