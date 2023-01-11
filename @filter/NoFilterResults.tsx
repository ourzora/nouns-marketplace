import { useCollectionFilters } from '@filter/providers'
import { Heading, Stack } from '@zord'

import { stringDefaults } from './constants'

export function NoFilterResults({
  noResultsString,
}: {
  noResultsString: keyof typeof stringDefaults
}) {
  const { getString } = useCollectionFilters()
  return (
    <Stack
      px="x4"
      py={{
        '@initial': 'x4',
        '@1024': 'x12',
      }}
      align="center"
    >
      <Heading size="sm">{getString(noResultsString)}</Heading>
    </Stack>
  )
}
