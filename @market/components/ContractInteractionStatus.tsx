import {
  Box,
  Button,
  Flex,
  Label,
  Paragraph,
  Text,
  Stack,
  Separator,
} from '@zoralabs/zord'
import { ModalTitleAndDescription } from '@market/components'
import { formatCryptoVal, shortenTxHash, ETHERSCAN_BASE_URL } from '@shared'

interface ContractInteractionStatusProps {
  title: string
  tokenAddress?: string
  tokenId?: string
  description?: string
  buttonCopy?: string
  amount?: string
  currencyAddress?: string
  onConfirm?: () => void
  txHash: string
  previewURL?: string
}

export function ContractInteractionStatus({
  title,
  amount,
  currencyAddress,
  description = 'Once your transaction has been processed it will be reflected on the page. In the meanwhile, you can close this window.',
  buttonCopy = 'Got It',
  onConfirm,
  txHash,
  previewURL,
}: ContractInteractionStatusProps) {
  const prettyAmount = amount && formatCryptoVal(amount)

  return (
    <Box>
      <ModalTitleAndDescription title={title} description={description} />
      {amount && (
        <>
          <Separator />
          <Label mt="x2" mb="x4">
            Listed for: {prettyAmount} ETH
          </Label>
        </>
      )}
      <Stack>
        <Flex gap="x4">
          <Box
            as="img"
            src={previewURL}
            alt="token-preview-img"
            w="x14"
            h="x14"
            borderRadius="normal"
            backgroundColor="secondary"
          />
          <Flex flex={1} direction={['column', 'row']} w="100%">
            <Stack justify="center" h="100%">
              <Stack>
                <Label mb="x0" size="sm">
                  Status
                </Label>
                <Paragraph mb="x0" size="sm">
                  Processing
                </Paragraph>
              </Stack>
            </Stack>
            <Stack justify="center" h="100%">
              <Stack>
                <Label mb="x0" size="sm">
                  Transaction Hash
                </Label>
                <a
                  href={`${ETHERSCAN_BASE_URL}/tx/${txHash}`}
                  target="_blank"
                  rel="noreferer noopener noreferrer"
                >
                  <Text as="span" variant="link">
                    {shortenTxHash(txHash, 7, 4)}
                  </Text>{' '}
                  <Paragraph as="sup" top="x0" size="sm">
                    ↗
                  </Paragraph>
                </a>
              </Stack>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
      <Button w="100%" mt="x5" onClick={onConfirm}>
        {buttonCopy}
      </Button>
    </Box>
  )
}
