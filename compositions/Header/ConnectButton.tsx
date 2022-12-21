import { useAccount, useDisconnect, useNetwork } from 'wagmi'

import { Button, NounButtonProps } from 'components/Button'
import Link from 'next/link'
import { noTextWrap } from 'styles/styles.css'

import { EnsAvatar } from '@noun-auction/components/DataRenderers/EnsAvatar'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useEnsData } from '@shared/hooks'
import { Box, Flex, Icon, PopUp, Separator, Stack, Text } from '@zord'

import * as styles from './Header.css'

interface ConnectButtonProps extends NounButtonProps {
  connectText?: string
}

export function ConnectButton({ connectText = 'Connect', ...props }: ConnectButtonProps) {
  const { disconnect } = useDisconnect({
    onError(error) {
      console.error('Error', error)
    },
  })
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const { displayName } = useEnsData({ address })

  if (!address || !chain) {
    return (
      <Button
        className={styles.connectButton}
        size="md"
        w="auto"
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
        variant="destructive"
        px="x5"
        className={styles.connectButton}
        onClick={openChainModal}
        size="md"
        w="auto"
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
    <Flex className={styles.connectButton} gap="x3">
      <PopUp
        padding="x0"
        placement="bottom-end"
        wrapperClassName={styles.popupWrapper}
        trigger={
          <Button variant="ghost" type="button" size="md" w="auto">
            <Box as="span">{displayName}</Box>
            <Icon id="ChevronDown" />
          </Button>
        }
      >
        <Stack className={styles.modalContent} gap="x0" p="x2">
          <Flex justify="space-between" p="x2">
            <Link passHref href={`/manage/${address}`}>
              <Button size="md" as="a" variant="unset" className={styles.topMenuItem}>
                <EnsAvatar address={address} />
                <Box ml={'x2'} as="span" className={[noTextWrap]}>
                  {displayName}
                </Box>{' '}
              </Button>
            </Link>
            <Button
              size="md"
              variant="unset"
              onClick={() => disconnect()}
              className={[styles.disconnectButton, styles.topMenuItem]}
            >
              Disconnect
            </Button>
          </Flex>
          <Separator />
          <Box as="ul" pt="x2">
            <Flex as="li">
              <Link href={`/manage/${address}`}>
                <a className={styles.connectMenuItem}>Manage NFTs</a>
              </Link>
            </Flex>
          </Box>
        </Stack>
      </PopUp>
    </Flex>
  )
}
