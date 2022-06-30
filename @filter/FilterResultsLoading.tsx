import { Stack, Icon } from '@zoralabs/zord'

export function FilterResultsLoading() {
  return (
    <Stack
      px="x4"
      py={{
        '@initial': 'x4',
        '@1024': 'x12',
      }}
      align="center"
    >
      <Icon id="Spinner" size="lg" />
    </Stack>
  )
}
