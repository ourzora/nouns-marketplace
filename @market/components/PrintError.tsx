import { useEffect } from 'react'
import { Box } from '@zoralabs/zord'
import { errorBox } from './MarketComponents.css'

export function PrintError({ errorMessage }: { errorMessage: any }) {
  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])

  return (
    <Box className={errorBox}>
      <code>
        <pre>ERROR: {errorMessage}</pre>
      </code>
    </Box>
  )
}
