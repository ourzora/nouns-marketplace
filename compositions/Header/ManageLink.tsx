import NextLink from 'next/link'
import { Button } from '@zoralabs/zord'
import { useAccount } from 'wagmi'

export function ManageLink() {
  const { address } = useAccount()

  if (address) {
    return (
      <NextLink href={`/manage/${address}`} passHref>
        <Button
          as="a"
          size="md"
          variant="secondary"
          borderRadius="curved"
          className="collection-trigger"
          style={{
            height: 42,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          Manage
        </Button>
      </NextLink>
    )
  } else {
    return null
  }
}
