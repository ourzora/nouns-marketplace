import { Button, Flex, Box, Text, Stack, PopUp, Separator, Icon } from '@zoralabs/zord'
import { connectButton, disconnectButton, menuItem, modalContent } from './Header.css'
import Link from 'next/link'
import { useConnectModal, useChainModal } from '@rainbow-me/rainbowkit'
import { useDisconnect, useAccount, useNetwork } from 'wagmi'
import { useEnsData } from '@shared'
import { EnsAvatar } from '@noun-auction/components/DataRenderers/EnsAvatar'
import { noTextWrap } from 'styles/styles.css'

export const ConnectButton = ({ connectText = 'Connect wallet', ...props }) => {
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const { displayName } = useEnsData({ address })

  if (!address || !chain) {
    return (
      <Button
        className={connectButton}
        size="sm"
        px="x4"
        onClick={openConnectModal}
        {...props}
      >
        {connectText}
      </Button>
    )
  }

  if (chain.unsupported) {
    return (
      <Button
        size="sm"
        variant="destructive"
        px="x4"
        className={connectButton}
        onClick={openChainModal}
        style={{ gap: 4, gridGap: 4 }}
        {...props}
      >
        <Text
          as="span"
          variant="paragraph-lg"
          style={{ lineHeight: 0, top: 1, position: 'relative' }}
        >
          &#x26A0;
        </Text>{' '}
        Wrong network
      </Button>
    )
  }

  return (
    <Flex className={connectButton} gap="x3">
      <PopUp
        padding="x0"
        placement="bottom-end"
        trigger={
          <Button variant="ghost" type="button">
            <Box as="span">{displayName}</Box>
            <Icon id="ChevronDown" />
          </Button>
        }
      >
        <Stack className={modalContent} gap="x0">
          <Flex className={menuItem} justify="space-between">
            <Link passHref href="/collections">
              <Button as="a" size="sm" variant="unset">
                <EnsAvatar address={address} />
                <Box ml={'x2'} as="span" className={[noTextWrap]}>
                  {displayName}
                </Box>{' '}
              </Button>
            </Link>
            <Box onClick={disconnect} className={[disconnectButton]}>
              Disconnect
            </Box>
          </Flex>
          <Separator />
          <Box className={menuItem}>
            <Link href={`/manage/${address}`}>Manage NFTs</Link>
          </Box>
        </Stack>
      </PopUp>
    </Flex>
  )
}
