import { useAccount, useDisconnect, useNetwork } from 'wagmi'

import { Button } from 'components/Button'
import Link from 'next/link'
import { noTextWrap } from 'styles/styles.css'

import { EnsAvatar } from '@noun-auction/components/DataRenderers/EnsAvatar'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useEnsData } from '@shared/hooks'
import { Box, Flex, Icon, PopUp, Separator, Stack, Text } from '@zoralabs/zord'

import {
  connectButton,
  disconnectButton,
  menuItem,
  modalContent,
  popUpWrapper,
} from './Header.css'

export const ConnectButton = ({ connectText = 'Connect', ...props }) => {
  const { disconnect } = useDisconnect({
    onError(error) {
      console.log('Error', error)
    },
  })
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const { displayName } = useEnsData({ address })

  if (!address || !chain) {
    return (
      <Button className={connectButton} size="sm" onClick={openConnectModal} {...props}>
        {connectText}
      </Button>
    )
  }

  if (chain.unsupported) {
    return (
      <Button
        variant="destructive"
        px="x5"
        className={connectButton}
        onClick={openChainModal}
        {...props}
      >
        <Text as="span" variant="paragraph-lg">
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
        wrapperClassName={popUpWrapper}
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
              <Button as="a" variant="unset">
                <EnsAvatar address={address} />
                <Box ml={'x2'} as="span" className={[noTextWrap]}>
                  {displayName}
                </Box>{' '}
              </Button>
            </Link>
            <Button
              variant="unset"
              onClick={() => disconnect()}
              className={[disconnectButton]}
            >
              Disconnect
            </Button>
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
