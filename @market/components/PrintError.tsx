import { Box } from '@zoralabs/zord'
import { errorBox } from './MarketComponents.css'

export function PrintError({ errorMessage }: { errorMessage: any }) {
  return (
    <Box className={errorBox}>
      <code>
        <pre>{errorMessage}</pre>
      </code>
    </Box>
  )
}
