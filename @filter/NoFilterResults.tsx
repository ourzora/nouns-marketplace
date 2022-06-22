import { Heading, Stack } from '@zoralabs/zord'
import { stringDefaults } from './constants'
import { useCollectionFilters } from '@filter/providers'

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
