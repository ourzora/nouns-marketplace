import { stat } from 'styles/styles.css'

import { lightFont } from '@shared'
import { Stack, Text } from '@zoralabs/zord'

export function StatBlock({
  statType,
  statValue,
}: {
  statType: string
  statValue: string | number | null | undefined
}) {
  return (
    <Stack
      p="x4"
      borderColor="border"
      borderStyle="solid"
      borderWidth="thin"
      borderRadius="phat"
    >
      <Text
        variant={['heading-xs, heading-xl']}
        color="text2"
        className={[lightFont, stat]}
      >
        {statType}
      </Text>
      <Text variant="heading-xs" className={[lightFont, stat]}>
        {statValue}
      </Text>
    </Stack>
  )
}
