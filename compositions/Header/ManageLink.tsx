import { useAccount } from 'wagmi'

import { Button } from 'components/Button'
import Link from 'next/link'

import { manageButton } from './Header.css'

export function ManageLink() {
  const { address } = useAccount()

  if (address) {
    return (
      <Link href={`/manage/${address}`} passHref>
        <Button as="a" variant="secondary" className={[manageButton, 'zora-manage-link']}>
          Manage
        </Button>
      </Link>
    )
  } else {
    return null
  }
}
