import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import { Button, Flex, Box, Icon } from '@zoralabs/zord'
import { hideMobile } from 'styles/styles.css'
import { Zorb } from '@zora-brand/Zorb'
import { EnsAvatar } from '@noun-auction/components/DataRenderers/EnsAvatar'

import { useWindowWidth } from 'hooks'

export const ConnectButton = () => {
  const {} = useWindowWidth()

  return (
    <RKConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    size="sm"
                    px="x4"
                    onClick={openConnectModal}
                    borderRadius="curved"
                    style={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Connect Wallet
                  </Button>
                )
              }
              return (
                <Flex gap="x3">
                  <Button
                    size="md"
                    variant="secondary"
                    onClick={openAccountModal}
                    type="button"
                    borderRadius="curved"
                    style={{
                      gap: 8,
                      minWidth: 0,
                      height: 42,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <EnsAvatar address={account.address} />
                    <Box as="span" className={hideMobile}>
                      {account.displayName}
                    </Box>{' '}
                    <Icon id="ChevronDown" />
                  </Button>
                </Flex>
              )
            })()}
          </div>
        )
      }}
    </RKConnectButton.Custom>
  )
}
