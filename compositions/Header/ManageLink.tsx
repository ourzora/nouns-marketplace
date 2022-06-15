import { Box, Label } from '@zoralabs/zord'
import { Link } from 'components/Link'
import { useAccount } from 'wagmi'
import { collectionTrigger } from './Header.css'
import { buttonStyle } from 'styles/styles.css'

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
          display="flex"
          align="center"
          h="100%"
          size="lg"
          py={{
            '@initial': 'x1',
            '@1024': 'x2',
          }}
        >
          Manage
        </Label>
      </Link>
    </Box>
  )
}
