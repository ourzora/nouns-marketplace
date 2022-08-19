import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import { Button, Flex, Box, Icon, FlexProps } from '@zoralabs/zord'
import { hideMobile, noTextWrap } from 'styles/styles.css'
import { EnsAvatar } from '@noun-auction/components/DataRenderers/EnsAvatar'
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
                  <Flex>
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
