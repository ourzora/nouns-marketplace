import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import { Button, Flex, Box, Icon } from '@zoralabs/zord'
import { hideMobile } from 'styles/styles.css'
import { EnsAvatar } from '@noun-auction/components/DataRenderers/EnsAvatar'
import { useWindowWidth } from '@shared'
import UAuth from '@uauth/js'
import { useState, useEffect } from 'react'

const uauth = new UAuth({
  clientID: '1c690135-3701-47c4-9b25-78fa847ca188',
  redirectUri: 'https://nouns-marketplace-eight.vercel.app/',
})

export const UnstoppableDomainbtn = () => {
  const [userWallet, setUserWallet] = useState<string>('')

  //         //useEffect model
  useEffect(() => {
    // setUserWallet("Login With Unstoppable")
    uauth
      .user()
      .then((user) => {
        setUserWallet(user.sub)
        // user exists
        console.log('User information:', user)
      })
      .catch((err) => {
        console.log(err)
        // user does not exist
      })
  }, [])
  const {} = useWindowWidth()

  //login button
  const login = async () => {
    try {
      const authorization = await uauth.loginWithPopup()
      uauth.user().then((user) => {
        setUserWallet(user.sub)
        // user exist
        console.log('User information:', user)
      })
      console.log(authorization)
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      await uauth.logout()
      setUserWallet('')
    } catch (err) {
      console.error(err)
    }
  }

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
            <>
              {userWallet ? (
                <Button size="md" px="x4" mx="x5" borderRadius="curved" onClick={logout}>
                  {userWallet}
                </Button>
              ) : (
                <Button size="md" px="x4" mx="x5" borderRadius="curved" onClick={login}>
                  Login With Unstoppable
                </Button>
              )}
            </>
          </div>
        )
      }}
    </RKConnectButton.Custom>
  )
}
