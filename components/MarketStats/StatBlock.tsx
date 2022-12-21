import { stat } from 'styles/styles.css'

import { Label, Stack, Text } from '@zord'

export function StatBlock({
  statType,
  statValue,
}: {
  statType: string
  statValue: string | number | null | undefined
}) {
  return (
    <Stack
      px="x4"
      py="x3"
      gap="x4"
      borderColor="border"
      borderStyle="solid"
      borderWidth="thin"
      borderRadius="phat"
    >
      <Label
        // variant={['heading-xs, heading-xl']}
        // variant="heading-xs"
        inline
        color="text3"
        className={[stat]}
      >
        {statType}
      </Label>
      <Text inline variant="heading-xs" className={[stat]}>
        {statValue}
      </Text>
    </Stack>
  )
}
