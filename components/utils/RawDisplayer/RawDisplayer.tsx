import { Box } from '@zoralabs/zord'
import { codeWrapper, code } from './RawDisplayer.css'

export function RawDisplayer({ data }: { data?: any }) {
  return (
    <Box
      className={codeWrapper}
      p="x4"
      borderRadius="curved"
      backgroundColor="tertiary"
      w="100%"
      position="relative"
    >
      <Box className={code} w="100%">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </Box>
  )
}
