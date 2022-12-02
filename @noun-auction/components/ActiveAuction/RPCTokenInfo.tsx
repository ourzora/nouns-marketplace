import { Button } from 'components/Button'
import NextLink from 'next/link'
import Link from 'next/link'

import * as styles from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Box, BoxProps, Flex, Label, Stack } from '@zoralabs/zord'

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
        <Button as="a" variant="unset" className={styles.thumbnailLink}>
          {!!tokenId && !!collectionAddress && (
            <NounishThumbnail
              image={tokenImage}
              tokenContract={collectionAddress}
              tokenId={tokenId}
            />
          )}
        </Button>
      </NextLink>
      <Stack justify="space-around">
        <Box>
          <Box className={styles.rowCollectionName}>
            <Link href={`/collections/${collectionAddress}`} passHref>
              {tokenName ?? '...'}
            </Link>
          </Box>
          <Box mt="x1">
            <Label as="a" color="tertiary" className={[lightFont]}>
              <Link href={`/collections/${collectionAddress}`} passHref>
                {collectionName ?? '...'}
              </Link>
            </Label>
          </Box>
        </Box>
      </Stack>
    </Flex>
  )
}
