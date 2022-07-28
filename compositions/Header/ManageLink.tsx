import NextLink from 'next/link'
import { Label } from '@zoralabs/zord'
import { useAccount } from 'wagmi'
import { collectionTrigger, manageButton } from './Header.css'
import { clickAnimation, noTextWrap } from 'styles/styles.css'

export function ManageLink() {
  const { address } = useAccount()

  if (address) {
    return (
      <NextLink href={`/manage/${address}`} passHref>
        <Label
          as="a"
          className={[
            collectionTrigger,
            noTextWrap,
            clickAnimation,
            manageButton,
            'collection-trigger',
          ]}
          size="lg"
        >
          Manage
        </Label>
      </NextLink>
    )
  } else {
    return null
  }
}
