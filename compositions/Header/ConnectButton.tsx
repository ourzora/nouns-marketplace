import { Button } from 'components/Button'
import { hideMobile, noTextWrap } from 'styles/styles.css'

import { EnsAvatar } from '@noun-auction/components/DataRenderers/EnsAvatar'
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Flex, FlexProps, Icon } from '@zoralabs/zord'

import { connectButton } from './Header.css'

export interface ConnectButtonProps extends FlexProps {}

export const ConnectButton = ({ ...props }: ConnectButtonProps) => {
  return (
    <Flex {...props} className={[connectButton, 'connect-button-wrapper']}>
      <RKConnectButton.Custom>
        {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
          return (
            <Box
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
                  <Flex>
                    <Button
                      variant="secondary"
                      onClick={openAccountModal}
                      type="button"
                      style={{
                        gap: 8,
                        minWidth: 0,
                      }}
                    >
                      <EnsAvatar address={account.address} />
                      <Box as="span" className={[hideMobile, noTextWrap]}>
                        {account.displayName}
                      </Box>{' '}
                      <Icon id="ChevronDown" />
                    </Button>
                  </Flex>
                )
              })()}
            </Box>
          )
        }}
      </RKConnectButton.Custom>
    </Flex>
  )
}
