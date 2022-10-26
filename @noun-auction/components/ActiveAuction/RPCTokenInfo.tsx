import { Button } from 'components/Button'
import NextLink from 'next/link'

import { useToken } from 'hooks/useToken'

import * as styles from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { Box, BoxProps, Flex, Heading, Label, Stack } from '@zoralabs/zord'

import { NounishThumbnail } from '../DataRenderers/NounishThumbnail'

export interface RPCTokenInfoProps extends BoxProps {
  contractAddress: string | undefined
  tokenId: string | undefined
}

export function RPCTokenInfo({ contractAddress, tokenId, ...props }: RPCTokenInfoProps) {
  const { token } = useToken({ address: contractAddress!, tokenId: tokenId! })

  if (!token || !tokenId || !contractAddress) return null

  return (
    <Flex className={['nounish-auction__token-info', styles.tokenInfoWrapper]} {...props}>
      <NextLink href={`/collections/${contractAddress}/${tokenId}`} passHref>
        <Button as="a" variant="unset" className={styles.thumbnailLink}>
          <NounishThumbnail
            image={token?.image?.url!}
            tokenContract={contractAddress}
            tokenId={tokenId}
          />
        </Button>
      </NextLink>
      <Stack justify="space-between">
        <Heading size="sm" as="h3">
          {token.collectionName}
        </Heading>
        <Box mb="x1">
          <NextLink href={`/collections/${contractAddress}`} passHref>
            <Label as="a" color="tertiary" className={[lightFont]}>
              {token?.metadata?.collection?.name}
            </Label>
          </NextLink>
        </Box>
      </Stack>
    </Flex>
  )
}
