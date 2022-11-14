import { Button } from 'components/Button'
import { useRouter } from 'next/router'

import { useCallback } from 'react'

import * as styles from '@noun-auction/styles/NounishStyles.css'
import { lightFont } from '@shared'
import { useNFT } from '@zoralabs/nft-hooks'
import { Box, Flex, Heading, Stack } from '@zoralabs/zord'

import { TokenInfoConfig } from '../NounishAuction'
import { NounishThumbnail } from './NounishThumbnail'

export interface TokenInfoProps extends TokenInfoConfig {
  contractAddress: string
  tokenId: string
}

export function TokenInfo({
  contractAddress,
  tokenId,
  thumbnailSize,
  hideThumbnail,
  hideCollectionTitle,
  hideTitle,
  routePrefix,
  ...props
}: TokenInfoProps) {
  const router = useRouter()
  const { data } = useNFT(contractAddress, tokenId)

  /* Make this router pattern optional / customizeable */
  const contractLinkHandler = useCallback((e) => {
    e.preventDefault()
    router.push(`/${routePrefix}/${contractAddress}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tokenLinkHandler = useCallback((e) => {
    e.preventDefault()
    router.push(`/${routePrefix}/${contractAddress}/${tokenId}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex className={['nounish-auction__token-info', styles.tokenInfoWrapper]} {...props}>
      {data && (
        <>
          {!hideThumbnail && (
            <Button onClick={tokenLinkHandler} variant="unset" w="unset" h="unset">
              <NounishThumbnail
                image={data?.media?.image?.uri}
                tokenContract={contractAddress}
                tokenId={tokenId}
              />
            </Button>
          )}
          <Stack justify="space-between">
            {!hideTitle && (
              <Heading size="sm" as="h3">
                {data?.metadata?.name ??
                  `${data?.nft?.contract?.name} ${data?.nft?.tokenId}`}
              </Heading>
            )}
            {!hideCollectionTitle && (
              <Box mb="x1">
                <Button
                  onClick={contractLinkHandler}
                  variant="unset"
                  color="text3"
                  className={[lightFont]}
                >
                  {data?.nft?.contract?.name}
                </Button>
              </Box>
            )}
          </Stack>
        </>
      )}
    </Flex>
  )
}
