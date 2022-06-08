import { Box, Label } from '@zoralabs/zord'
import { Link } from 'components/Link'
import { useAccount } from 'wagmi'
import { collectionTrigger } from './Header.css'

export function ManageLink() {
  const { data: account } = useAccount()

  if (account === null) {
    return null
  }

  return (
    <Box>
      <Link href={`/manage/${account?.address}`}>
        <Label
          className={collectionTrigger}
          py="x2"
          as="a"
          display="flex"
          align="center"
          h="100%"
          size="lg"
        >
          Manage
        </Label>
      </Link>
    </Box>
  )
}
