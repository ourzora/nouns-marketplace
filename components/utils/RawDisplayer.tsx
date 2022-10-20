import { Box } from '@zoralabs/zord'

import { codeWrapper } from './UtilStyles.css'

export function RawDisplayer({ data }: { data?: any }) {
  return (
    <Box
      className={codeWrapper}
      p="x4"
      borderRadius="curved"
      backgroundColor="background2"
      w="100%"
      position="relative"
    >
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </Box>
  )
}
