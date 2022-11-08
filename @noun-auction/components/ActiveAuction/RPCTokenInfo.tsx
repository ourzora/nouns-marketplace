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
  collectionName?: string
  tokenImage?: string
}

export function RPCTokenInfo({
  collectionAddress,
  tokenId,
  collectionName,
  tokenImage,
  ...props
}: RPCTokenInfoProps) {
  return (
    <Flex className={['nounish-auction__token-info', styles.tokenInfoWrapper]} {...props}>
      <NextLink href={`/collections/${collectionAddress}/${tokenId}`} passHref>
        <Button as="a" variant="unset" className={styles.thumbnailLink}>
          {!tokenId && !!collectionAddress && (
            <NounishThumbnail
              image={tokenImage}
              tokenContract={collectionAddress}
              tokenId={tokenId}
            />
          )}
        </Button>
      </NextLink>
      <Stack justify="space-between">
        <Heading size="sm" as="h3">
          {collectionName ?? '...'}
        </Heading>
        <Box mb="x1">
          <NextLink href={`/collections/${collectionAddress}`} passHref>
            <Label as="a" color="tertiary" className={[lightFont]}>
              {collectionName ?? '..'}
            </Label>
          </NextLink>
        </Box>
      </Stack>
    </Flex>
  )
}
