import { Button } from 'components/Button'
import NextLink from 'next/link'

import { useToken } from 'hooks/useToken'

import * as styles from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Box, BoxProps, Flex, Heading, Label, Stack } from '@zoralabs/zord'

import { NounishThumbnail } from '../DataRenderers/NounishThumbnail'

export interface RPCTokenInfoProps extends BoxProps {
  collectionAddress: string
  tokenId: string
}

export function RPCTokenInfo({
  collectionAddress,
  tokenId,
  ...props
}: RPCTokenInfoProps) {
  const { token } = useToken({ collectionAddress, tokenId: tokenId! })

  if (!token || !tokenId || !collectionAddress) return null

  return (
    <Flex className={['nounish-auction__token-info', styles.tokenInfoWrapper]} {...props}>
      <NextLink href={`/collections/${collectionAddress}/${tokenId}`} passHref>
        <Button as="a" variant="unset" className={styles.thumbnailLink}>
          <NounishThumbnail
            image={token?.image?.url!}
            tokenContract={token.tokenContract}
            tokenId={tokenId}
          />
        </Button>
      </NextLink>
      <Stack justify="space-between">
        <Heading size="sm" as="h3">
          {token.collectionName}
        </Heading>
        <Box mb="x1">
          <NextLink href={`/collections/${collectionAddress}`} passHref>
            <Label as="a" color="tertiary" className={[lightFont]}>
              {token?.name ?? '..'}
            </Label>
          </NextLink>
        </Box>
      </Stack>
    </Flex>
  )
}
