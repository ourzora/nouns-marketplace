import { Stack, Flex, Heading, Label, Box, Button, BoxProps } from '@zoralabs/zord'
import NextLink from 'next/link'
import { NounishThumbnail } from '../DataRenderers/NounishThumbnail'
import { tokenInfoWrapper } from '@noun-auction/styles/NounishStyles.css'

import { lightFont } from '@shared'
import { useToken } from 'hooks/useToken'

export interface RPCTokenInfoProps extends BoxProps {
  contractAddress: string | undefined
  tokenId: string | undefined
}

export function RPCTokenInfo({ contractAddress, tokenId, ...props }: RPCTokenInfoProps) {
  const { token } = useToken({ address: contractAddress!, tokenId: tokenId! })

  // console.log({ data })

  if (!tokenId || !contractAddress) return null

  return (
    <Flex className={['nounish-auction__token-info', tokenInfoWrapper]} {...props}>
      <NextLink href={`/collections/${contractAddress}/${tokenId}`} passHref>
        <Button as="a" variant="unset">
          <NounishThumbnail
            image={token?.image?.url!}
            tokenContract={contractAddress}
            tokenId={tokenId}
          />
        </Button>
      </NextLink>
      <Stack justify="space-between">
        <Heading size="sm" as="h3">
          {token?.metadata?.name ? token?.metadata?.name : `${tokenId}`}
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
