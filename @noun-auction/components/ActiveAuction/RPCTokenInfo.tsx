import NextLink from 'next/link'
import Link from 'next/link'

import * as styles from '@noun-auction/styles/NounishStyles.css'
import { Box, BoxProps, Button, Flex, Span, Stack } from '@zord'

import { NounishThumbnail } from '../DataRenderers/NounishThumbnail'

export interface RPCTokenInfoProps extends BoxProps {
  collectionAddress: string
  tokenId: string
  collectionName?: string
  tokenName?: string
  tokenImage?: string
}

export function RPCTokenInfo({
  collectionAddress,
  tokenId,
  collectionName,
  tokenName,
  tokenImage,
  ...props
}: RPCTokenInfoProps) {
  return (
    <Flex className={['nounish-auction__token-info', styles.tokenInfoWrapper]} {...props}>
      <NextLink href={`/collections/${collectionAddress}/${tokenId}`} passHref>
        <Button as="a" variant="unset">
          {!!tokenId && !!collectionAddress && (
            <NounishThumbnail
              image={tokenImage}
              tokenContract={collectionAddress}
              tokenId={tokenId}
            />
          )}
        </Button>
      </NextLink>
      <Stack justify="center" gap="x1">
        <Box className={styles.rowCollectionName}>
          <Link href={`/collections/${collectionAddress}/${tokenId}`} passHref>
            {tokenName ?? '...'}
          </Link>
        </Box>
        <Box>
          <Link href={`/collections/${collectionAddress}`} passHref>
            <Span as="a" color="tertiary">
              {collectionName ?? '...'}
            </Span>
          </Link>
        </Box>
      </Stack>
    </Flex>
  )
}
