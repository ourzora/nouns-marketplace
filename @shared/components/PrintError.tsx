import { Box, BoxProps } from '@zoralabs/zord'

import { errorBox } from '../SharedStyles.css'

interface PrintErrorProps extends BoxProps {
  errorMessage: any
}

export function PrintError({ errorMessage, ...props }: PrintErrorProps) {
  return (
    <Box className={errorBox} {...props}>
      <code>
        <pre>ERROR: {errorMessage}</pre>
      </code>
    </Box>
  )
}
