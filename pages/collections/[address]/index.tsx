import { PageWrapper } from 'components/PageWrapper'

import { Separator, Stack } from '@zoralabs/zord'

const Collection = () => {
  return (
    <PageWrapper direction="column" gap="x4">
      <Stack>
        <Separator />
        {/* <Collections collectionAddress={collectionAddress} /> */}
      </Stack>
    </PageWrapper>
  )
}

export default Collection
