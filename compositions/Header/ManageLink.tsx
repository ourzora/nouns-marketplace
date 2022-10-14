import { useAccount } from 'wagmi'

import Link from 'next/link'

import { Button } from '@zoralabs/zord'

import { manageButton } from './Header.css'

export function ManageLink() {
  const { address } = useAccount()

  if (address) {
    return (
      <Link href={`/manage/${address}`} passHref>
        <Button
          as="a"
          size="md"
          variant="secondary"
          className={[manageButton, 'zora-manage-link']}
        >
          Manage
        </Button>
      </Link>
    )
  } else {
    return null
  }
}
