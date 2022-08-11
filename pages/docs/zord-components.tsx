import { DocsPageWrapper } from 'components/utils/DocsPageWrapper'
import { Button, Grid, Heading, Separator, Stack } from '@zoralabs/zord'

export default function NounsAuctionHistory() {
  return (
    <DocsPageWrapper title="Zord" width="100%" maxWidth="960px" useBackButton>
      <Stack gap="x4">
        <Separator />
        <Heading>Buttons</Heading>
        <Grid gap="x4" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
          <Button size="lg">Large</Button>
          <Button pill>Pill</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </Grid>
        <Separator />
      </Stack>
    </DocsPageWrapper>
  )
}
